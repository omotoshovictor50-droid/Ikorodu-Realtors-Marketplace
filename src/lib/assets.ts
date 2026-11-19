// Prefixes local files in /public with the base path (needed on GitHub Pages).
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
