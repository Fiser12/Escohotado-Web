export const generateFilterExpresionFromTags = (tags: string[], operation: "&&" | "||"): string | null => (
    tags.length !== 0 ? tags.map((tag) => `"${tag}"`).join(` ${operation} `) : null
)