import React from "react";
import { useIntl } from "react-intl";

export const DeleteAccountView = () => {
  const { formatMessage } = useIntl();
  return (
    <>
      <div className="col">
        <label className="text-secondary fw-bold pb-2">
          {formatMessage({
            id: "Delete account",
            defaultMessage: "Delete account",
          })}
        </label>
      </div>
      <div className="col">
        <button type="submit" className="btn btn-outline-danger fw-bold">
          {formatMessage({
            id: "Delete account",
            defaultMessage: "Delete account",
          })}
        </button>
      </div>
    </>
  );
};
