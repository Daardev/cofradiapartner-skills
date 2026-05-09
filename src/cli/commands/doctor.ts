import { runDoctor } from "../../core/doctor";

export async function runDoctorCommand(): Promise<void> {
  const result = await runDoctor();
  console.log("Doctor result:\n");
  console.log(`Node: ${result.node}`);
  console.log(`Directorio actual: OK (${result.cwd})`);
  console.log(`Permisos de escritura: ${result.writable}`);
  console.log(`Skills disponibles: ${result.skillsCount}`);
  console.log(`Agentes soportados: ${result.agentsCount}`);
  console.log(`Validacion de skills: ${result.skillsValidation}`);
}
