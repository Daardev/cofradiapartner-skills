import { beforeEach, describe, expect, it, vi } from "vitest";

const CANCELLED = Symbol("cancelled");

const {
  selectMock,
  textMock,
  multiselectMock,
  cancelMock,
  runInstallCommandMock,
  runDoctorCommandMock,
  runValidateCommandMock,
  searchSkillsMock,
  listSkillsMock
} = vi.hoisted(() => ({
  selectMock: vi.fn(),
  textMock: vi.fn(),
  multiselectMock: vi.fn(),
  cancelMock: vi.fn(),
  runInstallCommandMock: vi.fn(),
  runDoctorCommandMock: vi.fn(),
  runValidateCommandMock: vi.fn(),
  searchSkillsMock: vi.fn(),
  listSkillsMock: vi.fn()
}));

vi.mock("@clack/prompts", () => ({
  select: selectMock,
  text: textMock,
  multiselect: multiselectMock,
  cancel: cancelMock,
  isCancel: vi.fn((value: unknown) => value === CANCELLED)
}));

vi.mock("../src/cli/commands/install", () => ({
  runInstallCommand: runInstallCommandMock
}));

vi.mock("../src/cli/commands/doctor", () => ({
  runDoctorCommand: runDoctorCommandMock
}));

vi.mock("../src/cli/commands/validate", () => ({
  runValidateCommand: runValidateCommandMock
}));

vi.mock("../src/cli/commands/search", () => ({
  searchSkills: searchSkillsMock
}));

vi.mock("../src/core/registry", () => ({
  createLocalRegistry: vi.fn(() => ({
    listSkills: listSkillsMock
  }))
}));

import { runInteractiveMode } from "../src/cli/interactive";

const appleSkill = {
  id: "skill-apple-ui",
  name: "Apple UI",
  description: "Skill for premium interfaces",
  sourcePath: "/tmp/skill-apple-ui"
};

describe("interactive explicit back navigation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    listSkillsMock.mockResolvedValue([appleSkill]);
  });

  it("Buscar skills -> Volver a buscar", async () => {
    selectMock
      .mockResolvedValueOnce("search")
      .mockResolvedValueOnce("search_again")
      .mockResolvedValueOnce("main_menu")
      .mockRejectedValueOnce(new Error("stop-loop"));

    textMock.mockResolvedValueOnce("missing").mockResolvedValueOnce("still-missing");
    searchSkillsMock.mockResolvedValue([]);

    await expect(runInteractiveMode()).rejects.toThrow("stop-loop");

    expect(searchSkillsMock).toHaveBeenNthCalledWith(1, "missing");
    expect(searchSkillsMock).toHaveBeenNthCalledWith(2, "still-missing");
  });

  it("Buscar skills -> Volver al menu principal", async () => {
    selectMock
      .mockResolvedValueOnce("search")
      .mockResolvedValueOnce("main_menu")
      .mockResolvedValueOnce("doctor")
      .mockRejectedValueOnce(new Error("stop-loop"));

    textMock.mockResolvedValueOnce("missing");
    searchSkillsMock.mockResolvedValueOnce([]);

    await expect(runInteractiveMode()).rejects.toThrow("stop-loop");

    expect(runDoctorCommandMock).toHaveBeenCalledTimes(1);
  });

  it("Resultados -> seleccionar skill -> volver desde instalacion", async () => {
    selectMock
      .mockResolvedValueOnce("search")
      .mockResolvedValueOnce("install:skill-apple-ui")
      .mockResolvedValueOnce("back_menu")
      .mockRejectedValueOnce(new Error("stop-loop"));

    textMock.mockResolvedValueOnce("apple");
    searchSkillsMock.mockResolvedValueOnce([appleSkill]);

    await expect(runInteractiveMode()).rejects.toThrow("stop-loop");

    expect(runInstallCommandMock).not.toHaveBeenCalled();
  });

  it("Instalar skill -> Volver al menu principal", async () => {
    selectMock
      .mockResolvedValueOnce("install")
      .mockResolvedValueOnce("back_menu")
      .mockResolvedValueOnce("doctor")
      .mockRejectedValueOnce(new Error("stop-loop"));

    await expect(runInteractiveMode()).rejects.toThrow("stop-loop");

    expect(runDoctorCommandMock).toHaveBeenCalledTimes(1);
    expect(runInstallCommandMock).not.toHaveBeenCalled();
  });

  it("Seleccion local/global -> Volver a seleccion de skills", async () => {
    selectMock
      .mockResolvedValueOnce("install")
      .mockResolvedValueOnce("pick")
      .mockResolvedValueOnce("back_skills")
      .mockResolvedValueOnce("back_menu")
      .mockRejectedValueOnce(new Error("stop-loop"));

    multiselectMock.mockResolvedValueOnce(["skill-apple-ui"]);

    await expect(runInteractiveMode()).rejects.toThrow("stop-loop");

    expect(multiselectMock).toHaveBeenCalledTimes(1);
    expect(runInstallCommandMock).not.toHaveBeenCalled();
  });

  it("confirmacion final -> cancelar sin ejecutar instalacion", async () => {
    selectMock
      .mockResolvedValueOnce("install")
      .mockResolvedValueOnce("pick")
      .mockResolvedValueOnce("global")
      .mockResolvedValueOnce("back")
      .mockResolvedValueOnce("back_skills")
      .mockResolvedValueOnce("back_menu")
      .mockRejectedValueOnce(new Error("stop-loop"));

    multiselectMock.mockResolvedValueOnce(["skill-apple-ui"]);

    await expect(runInteractiveMode()).rejects.toThrow("stop-loop");

    expect(runInstallCommandMock).not.toHaveBeenCalled();
  });

  it("mantiene flujo exitoso de busqueda con resultado", async () => {
    selectMock
      .mockResolvedValueOnce("search")
      .mockResolvedValueOnce("install:skill-apple-ui")
      .mockResolvedValueOnce("pick")
      .mockResolvedValueOnce("global")
      .mockResolvedValueOnce("install")
      .mockRejectedValueOnce(new Error("stop-loop"));

    textMock.mockResolvedValueOnce("apple");
    searchSkillsMock.mockResolvedValueOnce([appleSkill]);
    multiselectMock.mockResolvedValueOnce(["skill-apple-ui"]);

    await expect(runInteractiveMode()).rejects.toThrow("stop-loop");

    expect(runInstallCommandMock).toHaveBeenCalledWith(["skill-apple-ui"], {
      all: false,
      global: true,
      target: undefined
    });
  });

  it("mantiene flujo exitoso de instalacion local", async () => {
    selectMock
      .mockResolvedValueOnce("install")
      .mockResolvedValueOnce("pick")
      .mockResolvedValueOnce("local")
      .mockResolvedValueOnce("suggested")
      .mockResolvedValueOnce("install")
      .mockRejectedValueOnce(new Error("stop-loop"));

    multiselectMock.mockResolvedValueOnce(["skill-apple-ui"]);

    await expect(runInteractiveMode()).rejects.toThrow("stop-loop");

    expect(runInstallCommandMock).toHaveBeenCalledWith(["skill-apple-ui"], {
      all: false,
      global: false,
      target: undefined
    });
  });

  it("mantiene flujo exitoso de instalacion global", async () => {
    selectMock
      .mockResolvedValueOnce("install")
      .mockResolvedValueOnce("all")
      .mockResolvedValueOnce("global")
      .mockResolvedValueOnce("install")
      .mockRejectedValueOnce(new Error("stop-loop"));

    await expect(runInteractiveMode()).rejects.toThrow("stop-loop");

    expect(runInstallCommandMock).toHaveBeenCalledWith([], {
      all: true,
      global: true,
      target: undefined
    });
  });

  it("mantiene flujo exitoso de validate", async () => {
    selectMock
      .mockResolvedValueOnce("validate")
      .mockResolvedValueOnce("skill-apple-ui")
      .mockRejectedValueOnce(new Error("stop-loop"));

    await expect(runInteractiveMode()).rejects.toThrow("stop-loop");

    expect(runValidateCommandMock).toHaveBeenCalledWith("skill-apple-ui", false);
  });

  it("mantiene flujo exitoso de doctor", async () => {
    selectMock
      .mockResolvedValueOnce("doctor")
      .mockRejectedValueOnce(new Error("stop-loop"));

    await expect(runInteractiveMode()).rejects.toThrow("stop-loop");

    expect(runDoctorCommandMock).toHaveBeenCalledTimes(1);
  });

  it("ESC en cualquier prompt cierra la sesion", async () => {
    selectMock.mockResolvedValueOnce("search");
    textMock.mockResolvedValueOnce(CANCELLED);

    await expect(runInteractiveMode()).resolves.toBeUndefined();

    expect(cancelMock).toHaveBeenCalledWith("Operacion cancelada.");
    expect(runInstallCommandMock).not.toHaveBeenCalled();
  });
});
