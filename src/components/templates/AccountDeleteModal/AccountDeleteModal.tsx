import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useIntl } from "react-intl";

export const AccountDeleteModal = () => {
  const { formatMessage } = useIntl();

  const titleStyle = {
    textSize: "12rem",
  };

  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>
          {formatMessage({
            id: "Delete Account",
            defaultMessage: "Delete Account",
          })}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          {formatMessage({
            id: "This action cannot be undone.",
            defaultMessage: "This action cannot be undone.",
          })}
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">
          {formatMessage({
            id: "Cancel",
            defaultMessage: "Cancel",
          })}
        </Button>
        <Button variant="danger">
          {formatMessage({
            id: "Delete Project",
            defaultMessage: "Delete Project",
          })}
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};
