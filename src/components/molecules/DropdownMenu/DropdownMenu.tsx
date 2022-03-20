import React from "react";
import { FormattedMessage } from "react-intl";
import { EditorButton } from "../../atoms/EditorButton/EditorButton";

type Props = {
  menuId: string;
  onClickEdit: () => void;
  onClickDelete: () => void;
  editButtonTitle?: string;
  deleteButtonTitle?: string;
};

export const EditorDropdownMenu: React.VFC<Props> = React.memo(
  function EditorDropdownMenu({ menuId, onClickEdit, onClickDelete,  editButtonTitle, deleteButtonTitle}: Props){
    return (
      <>
        <EditorButton
          id={"dropdown-" + menuId} 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          <i className="bi bi-three-dots"></i>
        </EditorButton>

        <ul className="dropdown-menu" aria-labelledby={"dropdown-" + menuId}>
          <li>
            <button className="dropdown-item" onClick={()=>onClickEdit()}>
              {
                editButtonTitle != undefined
                ? editButtonTitle 
                : <FormattedMessage id="QaItem.Edit" defaultMessage="Edit" />
              }
            </button>
          </li>

          <li>
            <button className="dropdown-item text-danger" onClick={()=>onClickDelete()}>
              {
                deleteButtonTitle != undefined
                ? deleteButtonTitle
                : <FormattedMessage id="QaItem.Delete" defaultMessage="Delete" />
              }
            </button>
          </li>
        </ul>
      </>
    );
  }
);