/** `topic/design` → `design` */
export const tagLabel = (tag: string) => tag.split('/').pop() ?? tag
