import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useIntl } from "react-intl";

export const ChangePasswordModal = () => {
  const { formatMessage } = useIntl();

  const titleStyle = {
    textSize: "12rem",
  };

  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>
          {formatMessage({
            id: "Change Password",
            defaultMessage: "Change Password",
          })}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-secondary">
              {" "}
              {formatMessage({
                id: "Current password",
                defaultMessage: "Current password",
              })}
            </Form.Label>
            <Form.Control type="password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-secondary">
              {" "}
              {formatMessage({
                id: "New password",
                defaultMessage: "New password",
              })}
            </Form.Label>
            <Form.Control type="password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-secondary">
              {" "}
              {formatMessage({
                id: "Confirm new password",
                defaultMessage: "Confirm new password",
              })}
            </Form.Label>
            <Form.Control type="password" />
          </Form.Group>
        </Form>

        <p className="text-secondary" style={{ fontSize: "12px" }}>
          {" "}
          {formatMessage({
            id:
              "Make sure it’s at least 8 characters including a number and a lowercase letter.",
            defaultMessage: "Confirm new password",
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
        <Button variant="primary">
          {formatMessage({
            id: "Change Password",
            defaultMessage: "Change Password",
          })}
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};
