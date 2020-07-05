import React, {
  ReactElement, useCallback, useMemo, useReducer,
} from 'react';
import cn from 'classnames';
import { useMutation } from '@apollo/react-hooks';
import { COMMENT_FORM_FIELDS } from '../../helpers';

import './AddComment.scss';
import { PopUp } from '../PopUp';
import { commentsQuery } from '../Comments/queries';
import { addCommentMutation } from './mutations';
import errorReducer, * as errors from './errorReducer';
import formDataReducer, * as form from './formDataReducer';
import statusReducer, * as status from './statusReducer';

interface NewCommentData {
  addComment: CommentItem;
}

interface NewCommentItem {
  author: string;
  body: string;
  date: number;
}

export const AddComment = (): ReactElement => {
  const [formData, setFormData] = useReducer(formDataReducer, form.initialFormData);
  const [errorMessages, setErrorMessages] = useReducer(errorReducer, errors.initialErrors);
  const [statusMessages, setStatus] = useReducer(statusReducer, status.initialStatus);
  const { author, body } = COMMENT_FORM_FIELDS;

  const [addComment, { error, loading }] = useMutation<NewCommentData, NewCommentItem>(
    addCommentMutation,
  );

  const ready = useMemo(() => !error && !loading, [error, loading]);

  const validateField = (name: string, value: string): boolean => {
    const allErrorMessages = COMMENT_FORM_FIELDS[name].validators.map(
      (validator: Validator) => validator(name, value),
    ).filter(Boolean) || [''];

    setErrorMessages(errors.addError(name, allErrorMessages[0]));

    return Boolean(allErrorMessages[0]);
  };

  const validateAll = useCallback(
    (): boolean => {
      let hasError = false;

      Object.entries(formData).forEach(([fieldName, fieldValue]) => {
        const isInvalid = validateField(fieldName, fieldValue);

        if (isInvalid) {
          hasError = true;
        }
      });

      return !hasError;
    },
    [formData],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;

    setFormData(form.setFieldData(name, value));
  };

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name } = e.target;

    setErrorMessages(errors.removeError(name));
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { value, name } = e.target;

    setFormData(form.setFieldData(name, value.trim()));
    validateField(name, value);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validateAll()) {
        return;
      }

      try {
        const res = await addComment({
          variables: {
            author: formData.author,
            body: formData.body,
            date: (new Date()).getTime(),
          },
          refetchQueries: [{
            query: commentsQuery,
          }],
        });
        const titleMessage = `Thanks ${res.data?.addComment.author}!`;
        const bodyMessage = 'Your comment was posted.';

        setStatus(status.setStatusSuccess(titleMessage, bodyMessage));
      } catch (err) {
        const titleMessage = 'Oops...';
        const bodyMessage = `Something went wrong. ${err}`;

        setStatus(status.setStatusError(titleMessage, bodyMessage));
      }

      setFormData(form.clearData());
    },
    [addComment, validateAll, formData.author, formData.body],
  );

  const clearStatus = useCallback(
    () => setStatus(status.clearStatus()), [],
  );

  return (
    <section className="AddComment">
      <form className="AddComment__Form" onSubmit={handleSubmit}>
        <label htmlFor={author.fieldName} className="AddComment__Label">
          <input
            type="text"
            className={cn('AddComment__Field', { 'AddComment__Field--error': errorMessages.author })}
            name={author.fieldName}
            placeholder={author.label}
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
        <label htmlFor={body.fieldName} className="AddComment__Label">
          <textarea
            rows={5}
            className={cn('AddComment__Field', { 'AddComment__Field--error': errorMessages.body })}
            name={body.fieldName}
            placeholder={body.label}
            value={formData.body}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {errorMessages.body && (
            <div className="AddComment__Error">
              {errorMessages.body}
            </div>
          )}
        </label>
        <button type="submit" className="AddComment__Button">
          Submit
        </button>
      </form>

      {ready && statusMessages.statusType && (
        <PopUp {...statusMessages} handleClick={clearStatus} />
      )}

    </section>
  );
};
