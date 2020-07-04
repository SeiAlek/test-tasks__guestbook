import cn from 'classnames';
import React, { ReactElement } from 'react';
import { StatusType } from '../../helpers';
import './PopUp.scss';

interface Props {
  message: AddStatus;
  handleClick: () => void;
}

export const PopUp = ({ message, handleClick }: Props): ReactElement => {
  const { statusType, title, body } = message;

  return (
    <div className={cn('PopUp', {
      'PopUp--success': statusType === StatusType.SUCCESS,
      'PopUp--error': statusType === StatusType.ERROR,
    })}
    >
      <div className="PopUp__Container">
        <h2 className="PopUp__Title">
          {title}
        </h2>
        <div className="PopUp__Body">
          {body}
        </div>
        <button
          type="button"
          className="PopUp__Button"
          onClick={handleClick}
        >
          Close
        </button>
      </div>
    </div>
  );
};
