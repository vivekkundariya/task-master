export const formatQuadrantName = (key: string) =>
  key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^(.)/, (str) => str.toUpperCase());