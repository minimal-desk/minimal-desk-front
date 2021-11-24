import { FormattedMessage } from "react-intl";
import { QaCollection } from "../QaCollection/QaCollection";
import { QaContents } from "../QaItem/QaItem";
import styles from "./TopicItem.module.css";

export interface TopicItemProps {
  topicTitle: string;
  topicId: string;
  items: QaContents[]

}

export const TopicItem = ({
  topicTitle, 
  topicId, 
  items
}: TopicItemProps) => {
  return(
    <div className="card bg-light">
      <div className="card-body">
        <div className="mx-2 d-flex flex-row justify-content-between align-items-center">
          <div className="fw-bold lead">{topicTitle}</div>
          <div>
            <button
              className={"btn btn-light " + styles.menuButton}
              type="button"
            >
              <i className="bi bi-plus"></i>
            </button>

            <button 
            className={"btn btn-light "  + styles.menuButton} 
            type="button" 
            id={"dropdown-" + topicId} 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
          >
            <i className="bi bi-three-dots"></i>
          </button>
          <ul className="dropdown-menu" aria-labelledby={"dropdown-" + topicId}>
            <li>
              <button className="dropdown-item" onClick={()=>{}}>
                <FormattedMessage id="TopicItem.Edit" defaultMessage="Edit topic name" />
              </button>
            </li>

            <li>
              <button className="dropdown-item" onClick={()=>{}}>
                <FormattedMessage id="TopicItem.Delete" defaultMessage="Delete topic" />
              </button>
            </li>
          </ul>
          </div>
        </div>
        <QaCollection items={items} />
      </div>
    </div>
  );
}
