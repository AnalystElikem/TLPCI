/** Returns the first valid image URL, or undefined when all are empty. */
export function firstValidImageSrc(
  ...candidates: Array<string | null | undefined>
): string | undefined {
  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (value) return value;
  }
  return undefined;
}
