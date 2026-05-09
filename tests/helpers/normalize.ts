export function normalizeForSnapshot(value: string): string {
  return value
    .replace(/\\/g, "/")
    .replace(/[A-Za-z]:\/Users\/[^/]+\/Desktop\/Proyectos\/npm-skill/g, "<WORKSPACE>")
    .replace(/\/Users\/[^/]+\/Desktop\/Proyectos\/npm-skill/g, "<WORKSPACE>")
    .replace(/[A-Za-z]:\//g, "<DRIVE>/")
    .replace(/dry-run-install-[^/]+/g, "dry-run-install-<TMP>")
    .replace(/\/tmp\/[\w-]+/g, "<TMP>")
    .replace(/v\d+\.\d+\.\d+/g, "vX.Y.Z");
}
