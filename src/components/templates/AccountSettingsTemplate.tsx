import React, { FC } from "react";
import { Navbar } from "react-bootstrap";
import { ConsoleFooter } from "../organisms";

interface Props {
  email: string;
  onChange: (value: string) => void;
}

export const AccountSettingsTemplate: FC<Props> = ({ email, onChange }) => {
  return (
    <>
      <AccountSettingsTemplate email={email} onChange={onChange} />
    </>
  );
};
