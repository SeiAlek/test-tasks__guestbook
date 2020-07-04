export const required: Validator = (name, value) => {
  if (value) {
    return '';
  }

  return `The ${name} is required.`;
};

export const minLength = (length: number): Validator => {
  return (name, value) => {
    return !value || ((value as string).length >= length)
      ? ''
      : `The ${name} should have at least ${length} characters.`;
  };
};

export const maxLength = (length: number): Validator => {
  return (name, value) => {
    return !value || ((value as string).length <= length)
      ? ''
      : `The ${name} should have no more ${length} characters.`;
  };
};
