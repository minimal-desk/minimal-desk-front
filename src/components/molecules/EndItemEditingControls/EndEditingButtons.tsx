import React from "react";
import { FormattedMessage } from "react-intl";

type Props = {
  onClickDone: () => void;
  onClickCancel: () => void;
  doneButtonTitle?: string;
};

export const EndEditingButtons: React.VFC<Props> = React.memo(
  ({ onClickDone, onClickCancel, doneButtonTitle}:Props) => {
    return (
      <div className="d-flex justify-content-end ms-4">
        <button type="button" className="btn btn-secondary" onClick={onClickCancel}>
          <FormattedMessage id="EndEditingButtons.Cancel" defaultMessage="Cancel" />
        </button>

        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={onClickDone}
        >
          {
            doneButtonTitle != undefined
            ? doneButtonTitle
            : <FormattedMessage id="EndEditingButtons.Done" defaultMessage="Done" />
          }
        </button>
      </div>
  );
  }
);

