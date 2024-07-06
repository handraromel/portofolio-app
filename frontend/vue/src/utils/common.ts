//Converts a string to a hyphenized lowercase string
export const hyphenize = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g, '-')
}

//Check any errors exist in a form
export const checkFormErrors = (errors: Record<string, string | undefined>) => {
  return Object.keys(errors).length > 0
}

//Converts value name with kebab case into formal formats
export const formalizeKebabCase = (field: string): string => {
  return field
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
