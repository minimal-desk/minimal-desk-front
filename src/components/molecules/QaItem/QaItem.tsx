import { FormattedMessage } from "react-intl";
import styles from "./QaItem.module.css";

export interface QaItemProps {
  title: string;
  contents: string;
  itemId: string;
  onClickEdit: (itemId: string) => void;
  onClickDelete: (itemId: string) => void;
}

export const QaItem = ({
  title,
  contents,
  itemId,
  onClickEdit = (_) => {},
  onClickDelete = (_) => {},
  ...props
}: QaItemProps) => {
  return(
  <div className="card" {...props}>
      <div className="card-body">
      <div className={styles.titleRow}>
        <p className="fw-bold text-body">{title}</p>
        <button 
          className={"btn btn-light " + styles.menuButton} 
          type="button" 
          id={"dropdown-" + itemId} 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          <i className="bi bi-three-dots"></i>
        </button>
        <ul className="dropdown-menu" aria-labelledby={"dropdown-" + itemId}>
          <li>
            <button className="dropdown-item" onClick={()=>onClickEdit(itemId)}>
              <FormattedMessage id="QaItem.Edit" defaultMessage="Edit" />
            </button>
          </li>

          <li>
            <button className="dropdown-item" onClick={()=>onClickDelete(itemId)}>
              <FormattedMessage id="QaItem.Delete" defaultMessage="Delete" />
            </button>
          </li>
        </ul>

      </div>
      <p className={"text-secondary " + styles.contents}>{contents}</p>
      </div>
  </div>
  );
}