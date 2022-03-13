import React from "react";
import { useIntl } from "react-intl";
import styles from "./AccountSettingsContainer.module.css";

import {
  PasswordUpdateView,
  UpdateEmailForm,
  DeleteAccountView,
} from "../../molecules";

interface Props {
  email: string;
  onChange: (value: string) => void;
}

export const AccountSettingsContainer: React.FC<Props> = ({
  email,
  onChange,
}) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <div className="container">
        <div className={styles.header}>
          <h3 className="fw-bold">
            {formatMessage({
              id: "Account Settings",
              defaultMessage: "Account Settings",
            })}
          </h3>
        </div>
        <div className={styles.content}>
          <UpdateEmailForm email={email} onChange={onChange} />
        </div>
        <div className={styles.content}>
          <PasswordUpdateView />
        </div>
        <DeleteAccountView />
      </div>
    </>
  );
};
