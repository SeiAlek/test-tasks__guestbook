import * as validator from './validators';

export const COMMENT_FORM_FIELDS: FormFields = {
  author: {
    fieldName: 'author',
    label: 'Name',
    autoComplete: 'name',
    validators: [
      validator.required,
      validator.minLength(2),
      validator.maxLength(20),
    ],
  },
  body: {
    fieldName: 'body',
    label: 'Comment',
    validators: [
      validator.required,
      validator.minLength(5),
      validator.maxLength(500),
    ],
  },
};
