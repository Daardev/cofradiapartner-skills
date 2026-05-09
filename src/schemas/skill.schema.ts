import { z } from "zod";

export const skillMetadataSchema = z.object({
  name: z
    .string({ required_error: "Missing or empty \"name\" in skill.md" })
    .trim()
    .min(1, "Missing or empty \"name\" in skill.md"),
  description: z
    .string({ required_error: "Missing or empty \"description\" in skill.md" })
    .trim()
    .min(1, "Missing or empty \"description\" in skill.md")
});

export type SkillMetadata = z.infer<typeof skillMetadataSchema>;
