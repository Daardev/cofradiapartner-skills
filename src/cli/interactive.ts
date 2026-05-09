import { confirm, multiselect, select, text } from "@clack/prompts";
import type { AgentId } from "../types/agent";
import { listAgents } from "../core/agents";
import { createLocalRegistry } from "../core/registry";
import { runAgentsCommand } from "./commands/agents";
import { runDoctorCommand } from "./commands/doctor";
import { runInstallCommand } from "./commands/install";
import { runListCommand } from "./commands/list";
import { runValidateCommand } from "./commands/validate";

export async function runInteractiveMode(): Promise<void> {
  const action = await select({
    message: "Que quieres hacer?",
    options: [
      { value: "install", label: "Instalar skill" },
      { value: "list", label: "Listar skills" },
      { value: "agents", label: "Ver agentes" },
      { value: "validate", label: "Validar skill" },
      { value: "doctor", label: "Ejecutar doctor" }
    ]
  });

  if (action === "list") return runListCommand();
  if (action === "agents") return runAgentsCommand();
  if (action === "doctor") return runDoctorCommand();
  if (action === "validate") {
    const registry = createLocalRegistry();
    const skills = await registry.listSkills();
    const skillId = await select({
      message: "Que skill quieres validar?",
      options: skills.map((skill) => ({ value: skill.id, label: skill.id }))
    });
    if (typeof skillId === "string") {
      await runValidateCommand(skillId, false);
    }
    return;
  }

  if (action === "install") {
    const registry = createLocalRegistry();
    const skills = await registry.listSkills();
    const selectedSkills = await multiselect({
      message: "Que skill quieres instalar?",
      options: [
        { value: "__all__", label: "Todas las skills" },
        ...skills.map((skill) => ({ value: skill.id, label: skill.id }))
      ]
    });

    const agent = await select({
      message: "En que agente quieres instalarla?",
      initialValue: "claude",
      options: listAgents().map((item) => ({ value: item.id, label: item.label }))
    });

    if (!Array.isArray(selectedSkills) || typeof agent !== "string") {
      return;
    }

    const installAll = selectedSkills.includes("__all__");
    const useSuggested = await confirm({ message: "Quieres usar la ruta sugerida?" });
    let target: string | undefined;
    if (useSuggested === false) {
      const custom = await text({
        message: "Escribe la ruta destino:"
      });
      target = typeof custom === "string" ? custom : undefined;
    }

    const proceed = await confirm({ message: "Confirmas la instalacion?" });
    if (!proceed) {
      return;
    }

    await runInstallCommand(
      installAll ? [] : selectedSkills.filter((value): value is string => value !== "__all__"),
      {
        all: installAll,
        agent: agent as AgentId,
        target
      }
    );
  }
}
