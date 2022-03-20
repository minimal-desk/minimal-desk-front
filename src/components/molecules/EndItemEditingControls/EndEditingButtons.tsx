import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

type Props = {
  onClickDone: () => void;
  onClickCancel: () => void;
  isNewItem?: boolean
};

export const EndEditingButtons: React.VFC<Props> = React.memo(
  function EndEditingButtons({ onClickDone, onClickCancel, isNewItem}:Props) {
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
            isNewItem
            ? <FormattedMessage id="EndEditingButtons.Add" defaultMessage="Add" />
            : <FormattedMessage id="EndEditingButtons.Done" defaultMessage="Done" />
          }
        </button>
      </div>
  );
  }
);
