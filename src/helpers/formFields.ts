import * as validator from './validators';

export const COMMENT_FORM_FIELDS: FormFields = {
  id: {
    fieldName: 'id',
    label: 'ID',
    validators: [
      validator.required,
    ],
  },
  author: {
    fieldName: 'author',
    label: 'Name',
    autoComplete: 'name',
    validators: [
      validator.required,
      validator.minLength(2),
      validator.maxLength(60),
    ],
  },
  comment: {
    fieldName: 'comment',
    label: 'Comment',
    validators: [
      validator.required,
      validator.minLength(5),
      validator.maxLength(200),
    ],
  },
};
