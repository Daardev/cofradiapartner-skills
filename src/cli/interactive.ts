import { cancel, isCancel, multiselect, select, text } from "@clack/prompts";
import { createLocalRegistry } from "../core/registry";
import { logger } from "../utils/logger";
import { runDoctorCommand } from "./commands/doctor";
import { runInstallCommand } from "./commands/install";
import { runListCommand } from "./commands/list";
import { searchSkills } from "./commands/search";
import { runValidateCommand } from "./commands/validate";

type FlowResult = "menu" | "exit";
type ExitResult = "exit";

type InstallSelection =
  | { kind: "menu" }
  | {
      kind: "install";
      selectedSkills: string[];
      installAll: boolean;
    };

type InstallDestination =
  | { kind: "back" }
  | {
      kind: "destination";
      global: boolean;
      target?: string;
    };

function abortInteractiveSession(): ExitResult {
  cancel("Operacion cancelada.");
  return "exit";
}

async function selectSkillsToInstall(skillIds: string[], allowInstallAll: boolean): Promise<InstallSelection | ExitResult> {
  const mode = await select({
    message: "Como quieres instalar?",
    options: [
      { value: "pick", label: "Seleccionar skills" },
      ...(allowInstallAll ? [{ value: "all", label: "Instalar todas las skills" }] : []),
      { value: "back_menu", label: "Volver al menu principal" }
    ]
  });

  if (isCancel(mode)) {
    return abortInteractiveSession();
  }

  if (mode === "back_menu") {
    return { kind: "menu" };
  }

  if (mode === "all") {
    return {
      kind: "install",
      selectedSkills: [],
      installAll: true
    };
  }

  if (mode !== "pick") {
    return { kind: "menu" };
  }

  const selectedSkills = await multiselect({
    message: "Que skill quieres instalar? [espacio] para seleccionar",
    options: skillIds.map((skillId) => ({ value: skillId, label: skillId }))
  });

  if (isCancel(selectedSkills)) {
    return abortInteractiveSession();
  }

  if (!Array.isArray(selectedSkills) || selectedSkills.length === 0) {
    logger.info("No seleccionaste skills. Volviendo al menu principal.");
    return { kind: "menu" };
  }

  return {
    kind: "install",
    selectedSkills: selectedSkills.filter((value): value is string => typeof value === "string"),
    installAll: false
  };
}

async function selectInstallDestination(): Promise<InstallDestination | ExitResult> {
  while (true) {
    const scope = await select({
      message: "Donde quieres instalar la skill?",
      options: [
        {
          value: "local",
          label: "En la ruta actual",
          hint: "Usa .agents/skills dentro del proyecto actual"
        },
        {
          value: "global",
          label: "En entorno global",
          hint: "Usa ~/.agents/skills para cualquier proyecto"
        },
        { value: "back_skills", label: "Volver a la seleccion de skills" }
      ]
    });

    if (isCancel(scope)) {
      return abortInteractiveSession();
    }

    if (scope === "back_skills") {
      return { kind: "back" };
    }

    if (scope === "global") {
      return {
        kind: "destination",
        global: true
      };
    }

    if (scope !== "local") {
      continue;
    }

    while (true) {
      const localMode = await select({
        message: "Destino local",
        options: [
          { value: "suggested", label: "Usar .agents/skills (recomendado)" },
          { value: "custom", label: "Especificar ruta custom" },
          { value: "back_scope", label: "Volver a local/global" }
        ]
      });

      if (isCancel(localMode)) {
        return abortInteractiveSession();
      }

      if (localMode === "back_scope") {
        break;
      }

      if (localMode === "suggested") {
        return {
          kind: "destination",
          global: false
        };
      }

      if (localMode === "custom") {
        const customTarget = await text({ message: "Escribe la ruta destino:" });

        if (isCancel(customTarget)) {
          return abortInteractiveSession();
        }

        if (typeof customTarget !== "string" || customTarget.trim().length === 0) {
          logger.info("Ruta vacia. Volviendo a local/global.");
          break;
        }

        return {
          kind: "destination",
          global: false,
          target: customTarget
        };
      }
    }
  }
}

async function confirmInstallAction(): Promise<"install" | "back" | ExitResult> {
  const decision = await select({
    message: "Confirmacion final",
    options: [
      { value: "install", label: "Confirmar instalacion" },
      { value: "back", label: "Cancelar y volver" }
    ]
  });

  if (isCancel(decision)) {
    return abortInteractiveSession();
  }

  return decision === "install" ? "install" : "back";
}

async function runInteractiveInstallFlow(skillIds: string[], allowInstallAll: boolean): Promise<FlowResult> {
  while (true) {
    const selected = await selectSkillsToInstall(skillIds, allowInstallAll);

    if (selected === "exit") {
      return "exit";
    }

    if (selected.kind === "menu") {
      return "menu";
    }

    while (true) {
      const destination = await selectInstallDestination();

      if (destination === "exit") {
        return "exit";
      }

      if (destination.kind === "back") {
        break;
      }

      const decision = await confirmInstallAction();

      if (decision === "exit") {
        return "exit";
      }

      if (decision === "back") {
        continue;
      }

      await runInstallCommand(selected.installAll ? [] : selected.selectedSkills, {
        all: selected.installAll,
        global: destination.global,
        target: destination.target
      });

      return "menu";
    }
  }
}

async function runInteractiveSearchFlow(): Promise<FlowResult> {
  while (true) {
    const query = await text({ message: "Que quieres buscar?" });

    if (isCancel(query)) {
      return abortInteractiveSession();
    }

    if (typeof query !== "string" || query.trim().length === 0) {
      logger.info("Busqueda vacia. Volviendo al menu principal.");
      return "menu";
    }

    const matchedSkills = await searchSkills(query);
    if (matchedSkills.length === 0) {
      const noResultsAction = await select({
        message: `No se encontraron skills para \"${query}\".`,
        options: [
          { value: "search_again", label: "Volver a buscar" },
          { value: "main_menu", label: "Volver al menu principal" }
        ]
      });

      if (isCancel(noResultsAction)) {
        return abortInteractiveSession();
      }

      if (noResultsAction === "search_again") {
        continue;
      }

      return "menu";
    }

    while (true) {
      const resultAction = await select({
        message: `Resultados para \"${query}\"`,
        options: [
          ...matchedSkills.map((skill) => ({
            value: `install:${skill.id}`,
            label: skill.id,
            hint: `${skill.name} - ${skill.description}`
          })),
          { value: "search_again", label: "Volver a buscar" },
          { value: "main_menu", label: "Volver al menu principal" }
        ]
      });

      if (isCancel(resultAction)) {
        return abortInteractiveSession();
      }

      if (resultAction === "search_again") {
        break;
      }

      if (resultAction === "main_menu") {
        return "menu";
      }

      if (typeof resultAction === "string" && resultAction.startsWith("install:")) {
        const selectedSkillId = resultAction.replace("install:", "");
        return runInteractiveInstallFlow([selectedSkillId], false);
      }
    }
  }
}

async function runInteractiveValidateFlow(): Promise<FlowResult> {
  const registry = createLocalRegistry();
  const skills = await registry.listSkills();

  const skillId = await select({
    message: "Que skill quieres validar?",
    options: [
      ...skills.map((skill) => ({ value: skill.id, label: skill.id })),
      { value: "back_menu", label: "Volver al menu principal" }
    ]
  });

  if (isCancel(skillId)) {
    return abortInteractiveSession();
  }

  if (typeof skillId !== "string" || skillId === "back_menu") {
    return "menu";
  }

  await runValidateCommand(skillId, false);
  return "menu";
}

export async function runInteractiveMode(): Promise<void> {
  while (true) {
    const action = await select({
      message: "Que quieres hacer?",
      options: [
        { value: "install", label: "Instalar skill" },
        { value: "list", label: "Listar skills" },
        { value: "search", label: "Buscar skills" },
        { value: "validate", label: "Validar skill" },
        { value: "doctor", label: "Ejecutar doctor" }
      ]
    });

    if (isCancel(action)) {
      cancel("Operacion cancelada.");
      return;
    }

    if (action === "list") {
      await runListCommand();
      continue;
    }

    if (action === "search") {
      const result = await runInteractiveSearchFlow();
      if (result === "exit") {
        return;
      }
      continue;
    }

    if (action === "validate") {
      const result = await runInteractiveValidateFlow();
      if (result === "exit") {
        return;
      }
      continue;
    }

    if (action === "doctor") {
      await runDoctorCommand();
      continue;
    }

    if (action === "install") {
      const registry = createLocalRegistry();
      const skills = await registry.listSkills();
      const result = await runInteractiveInstallFlow(
        skills.map((skill) => skill.id),
        true
      );
      if (result === "exit") {
        return;
      }
    }
  }
}
