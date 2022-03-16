import React from "react";
import { Button } from "react-bootstrap";
import { DashboardCard } from "../../organisms";
import styles from "./Dashboard.module.css";
import { useIntl } from "react-intl";

export const Dashboard = () => {
  const { formatMessage } = useIntl();
  return (
    <>
      <div className={`container ${styles.container}`}>
        <div className="d-flex justify-content-between pt-5 pb-2">
          <h3 className="">
            {formatMessage({
              id: "Project",
              defaultMessage: "Project",
            })}
          </h3>
          <Button variant="secondary" className="d-none d-sm-block">
            <i className="bi bi-plus"></i>
            <span className="ms-1">
              {formatMessage({
                id: "Add project",
                defaultMessage: "Add project",
              })}
            </span>
          </Button>
        </div>
        <div className="row d-flex justify-content-start">
          <div className="col-xs-12 col-sm-6 col-xl-4 pb-4">
            <DashboardCard title={"project title"} />
          </div>
          <div className="col-xs-12 col-sm-6 col-xl-4 pb-4">
            <DashboardCard title={"project title"} />
          </div>
          <div className="col-xs-12 col-sm-6 col-xl-4 pb-4">
            <DashboardCard title={"project title"} />
          </div>
          <div className="col-xs-12 col-sm-6 col-xl-4 pb-4">
            <DashboardCard title={"project title"} />
          </div>
          <div className="col-xs-12 col-sm-6 col-xl-4 pb-4">
            <DashboardCard title={"project title"} />
          </div>
        </div>
      </div>
    </>
  );
};
