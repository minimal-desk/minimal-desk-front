import React from "react";
import { useIntl } from "react-intl";

export const PasswordUpdateView: React.FC = () => {
  const { formatMessage } = useIntl();
  return (
    <>
      <div className="col">
        <label className="text-secondary fw-bold pb-2">
          {formatMessage({
            id: "Password",
            defaultMessage: "Password",
          })}
        </label>
      </div>
      <div className="col">
        <button type="submit" className="btn btn-secondary fw-bold">
          {formatMessage({
            id: "Update",
            defaultMessage: "Update",
          })}
        </button>
      </div>
    </>
  );
};
