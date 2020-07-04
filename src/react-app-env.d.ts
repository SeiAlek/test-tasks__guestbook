// / <reference types="react-scripts" />

interface CommentItem {
  id: string;
  date: number;
  author: string;
  comment: string;
}

interface FormFields {
  [key: string]: FormField;
}

interface FormField {
  fieldName: string;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  validators: Validator[];
}

type Validator = (name: string, value: string) => string;
