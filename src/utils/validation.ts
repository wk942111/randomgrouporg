export interface ValidationOptions {
  allowDuplicates?: boolean;
}

export const validateAndCleanNames = (
  input: string,
  options: ValidationOptions = {}
): { names: string[]; error?: string } => {
  const { allowDuplicates = false } = options;
  
  if (!input.trim()) {
    return { names: [], error: 'errors.emptyInput' };
  }

  let names = input
    .split('\n')
    .map((name) => name.trim())
    .filter((name) => name.length > 0);

  if (!allowDuplicates) {
    const duplicates = names.filter(
      (name, index) => names.indexOf(name) !== index
    );
    if (duplicates.length > 0) {
      return {
        names: [],
        error: 'errors.duplicateNames'
      };
    }
  }

  return { names };
}; 