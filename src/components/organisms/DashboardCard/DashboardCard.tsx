import React from "react";
import { Card } from "react-bootstrap";
import { useIntl } from "react-intl";

type Props = {
  title: string;
};

export const DashboardCard: React.VFC<Props> = React.memo(
  function DashboardCard({ title }) {
    const { formatMessage } = useIntl();
    return (
      <Card>
        <Card.Body>
          <Card.Title className="pt-3 pb-5 mb-4">{title}</Card.Title>
          <Card.Link href="#" className="text-decoration-none">
            {formatMessage({
              id: "FAQ page",
              defaultMessage: "FAQ page",
            })}
          </Card.Link>
          <Card.Link href="#" className="text-decoration-none">
            {formatMessage({
              id: "Settings",
              defaultMessage: "Settings",
            })}
          </Card.Link>
        </Card.Body>
      </Card>
    );
  }
);
