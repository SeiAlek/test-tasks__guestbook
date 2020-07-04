import React, { ReactElement, useEffect, useReducer } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { COMMENT_FORM_FIELDS } from '../../helpers';
import * as api from '../../helpers/api';
import * as store from '../../store';
import './AddComment.scss';
import errorReducer, * as errorAction from './errorReducer';
import formDataReducer, * as formAction from './formDataReducer';

export const AddComment = (): ReactElement => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useReducer(formDataReducer, formAction.initialFormData);
  const [errorMessages, setErrorMessages] = useReducer(errorReducer, errorAction.initialErrors);

  useEffect(() => {
    setFormData(formAction.setFieldData('id', uuidv4()));
  }, []);

  const validateField = (name: string, value: string): boolean => {
    const allErrorMessages = COMMENT_FORM_FIELDS[name].validators.map(
      (validator: Validator) => validator(name, value),
    ).filter(Boolean) || [''];

    setErrorMessages(errorAction.addError(name, allErrorMessages[0]));

    return Boolean(allErrorMessages[0]);
  };

  const validateAll = (): boolean => {
    let hasError = false;

    Object.entries(formData).forEach(([fieldName, fieldValue]) => {
      const isInvalid = validateField(fieldName, fieldValue);

      if (isInvalid) {
        hasError = true;
      }
    });

    return !hasError;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;

    setFormData(formAction.setFieldData(name, value));
  };

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name } = e.target;

    setErrorMessages(errorAction.removeError(name));
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { value, name } = e.target;

    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateAll()) {
      return;
    }

    const comment = {
      id: formData.id,
      author: formData.author,
      comment: formData.comment,
      date: (new Date()).getTime(),
    };

    await api.postData(comment);

    setFormData(formAction.clearData());
    setFormData(formAction.setFieldData('id', uuidv4()));
    dispatch(store.loadComments());
  };

  return (
    <section className="AddComment">
      <form className="AddComment__Form" onSubmit={handleSubmit}>
        <label htmlFor={COMMENT_FORM_FIELDS.author.fieldName} className="AddComment__Label">
          <input
            type="text"
            className={cn('AddComment__Field', { 'AddComment__Field--error': errorMessages.author })}
            name={COMMENT_FORM_FIELDS.author.fieldName}
            value={formData.author}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {errorMessages.author && (
            <div className="AddComment__Error">
              {errorMessages.author}
            </div>
          )}
        </label>
        <label htmlFor={COMMENT_FORM_FIELDS.comment.fieldName} className="AddComment__Label">
          <textarea
            rows={5}
            className={cn('AddComment__Field', { 'AddComment__Field--error': errorMessages.comment })}
            name={COMMENT_FORM_FIELDS.comment.fieldName}
            value={formData.comment}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {errorMessages.comment && (
            <div className="AddComment__Error">
              {errorMessages.comment}
            </div>
          )}
        </label>
        <button type="submit" className="AddComment__Button">
          Submit
        </button>
      </form>
    </section>
  );
};
