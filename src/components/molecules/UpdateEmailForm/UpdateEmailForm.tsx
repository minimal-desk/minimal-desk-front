import React from "react";
import { useIntl } from "react-intl";

interface Props {
  email: string;
  onChange: (value: string) => void;
}

export const UpdateEmailForm: React.FC<Props> = ({ email, onChange }) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <form className="form-group">
        <label
          htmlFor="updateEmailForm"
          className="text-secondary fw-bold pb-2"
        >
          {formatMessage({
            id: "Email",
            defaultMessage: "Email",
          })}
        </label>
        <div className="row">
          <div className="col">
            <input
              type="email"
              className="form-control"
              id="updateEmailForm"
              aria-describedby="emailHelp"
              placeholder="example@example.com"
              value={email}
              onChange={({ target: { value } }) => onChange(value)}
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-secondary fw-bold">
              {formatMessage({
                id: "Update",
                defaultMessage: "Update",
              })}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
