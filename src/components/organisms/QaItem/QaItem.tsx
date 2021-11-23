import { FormattedMessage } from "react-intl";
import styles from "./QaItem.module.css";
import React, { useState } from "react";

export interface QaItemProps extends QaContents {
  onClickDelete: (itemId: string) => void;
  onUpdate:(contents: QaContents) => void;
}

export interface QaContents {
  title: string;
  contents: string;
  itemId: string;
}

interface StaticItemProps extends QaContents {
  onClickEdit: () => void;
  onClickDelete: () => void;
}

const StaticItem = (props: StaticItemProps) => (
  <div className="card">
    <div className="card-body">
      <div className={styles.titleRow}>
        <p className="fw-bold text-body">{props.title}</p>
        <button 
          className={"btn btn-light " + styles.menuButton} 
          type="button" 
          id={"dropdown-" + props.itemId} 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          <i className="bi bi-three-dots"></i>
        </button>
        <ul className="dropdown-menu" aria-labelledby={"dropdown-" + props.itemId}>
          <li>
            <button className="dropdown-item" onClick={()=>props.onClickEdit()}>
              <FormattedMessage id="QaItem.Edit" defaultMessage="Edit" />
            </button>
          </li>

          <li>
            <button className="dropdown-item" onClick={()=>props.onClickDelete()}>
              <FormattedMessage id="QaItem.Delete" defaultMessage="Delete" />
            </button>
          </li>
        </ul>
      </div>
      <p className={"text-secondary " + styles.contents}>{props.contents}</p>
    </div>
  </div>
);


interface EditingProps extends QaContents{
  onClickCancel: () => void;
  onClickDone: (qaContents: QaContents) => void;
}

const EditingItem = (props: EditingProps) => {
  const [title, setTitle] = useState(props.title)
  const [contents, setContents] = useState(props.contents)
  return (
    <div className="card">
      <div className="card-body">
        <form>
          <div className="mb-4">
            <label className="form-text mx-1 mb-1 text-secondary"><FormattedMessage id="QaItem.Editing.Title" defaultMessage="Title" /></label>
            <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-text mx-1 mb-1 text-secondary"><FormattedMessage id="QaItem.Editing.Contents" defaultMessage="Contents" /></label>
            <textarea className="form-control" rows={3} value={contents} onChange={(e) => setContents(e.target.value)} />
          </div>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-secondary" onClick={props.onClickCancel}>
              <FormattedMessage id="QaItem.Editing.Cancel" defaultMessage="Cancel" />
            </button>

            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={() => props.onClickDone({title: props.title, contents: props.contents, itemId: props.itemId})}
            >
              <FormattedMessage id="QaItem.Editing.Done" defaultMessage="Done" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export const QaItem = ({
  title,
  contents,
  itemId,
  onClickDelete,
  onUpdate,
}: QaItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  if (isEditing) {
    return (
      <EditingItem 
        title={title} contents={contents} itemId={itemId} 
        onClickCancel={() => {setIsEditing(false)}} 
        onClickDone={(c) => {
          onUpdate(c);
          setIsEditing(false);
        }} 
      />
    );
  } else {
    return (
      <StaticItem 
        title={title} contents={contents} itemId={itemId}  
        onClickEdit={() => {setIsEditing(true)}} onClickDelete={() => {onClickDelete(itemId)}}
      />
    );
  }
}
