import { FormattedMessage } from "react-intl";
import styles from "./QaItem.module.css";
import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord, Identifier } from "dnd-core";
import { ItemTypes } from "../TopicCollection/TopicCollection";
import { EndEditingButtons } from "../../molecules/EndItemEditingControls/EndEditingButtons";
import { EditorDropdownMenu } from "../../molecules/DropdownMenu/DropdownMenu";

interface QaDisplayItem extends QaContents {
  topicIndex: number;
  index: number;
  moveQaItem: (dragTopicIndex: number, dragQaIndex: number, 
    hoverTopicIndex: number, hoverQaIndex: number) => void;
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
  topicIndex: number;
  index: number;
  moveQaItem: (dragTopicIndex: number, dragQaIndex: number, 
    hoverTopicIndex: number, hoverQaIndex: number) => void;
}


interface EditingProps extends QaContents{
  onClickCancel: () => void;
  onClickDone: (qaContents: QaContents) => void;
}

interface DragItem {
  topicIndex: number;
  index: number;
  itemId: string; 
}

const StaticItem = ({ title, contents, itemId, topicIndex, index, onClickDelete, onClickEdit, moveQaItem }: StaticItemProps) => {
 
  const ref = useRef<HTMLDivElement>(null);

  const [{isDragging} , drag] = useDrag({
    type: ItemTypes.QA,
    item: () => {
      return { itemId, index, topicIndex }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop<
    DragItem, 
    void, 
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.QA,
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragTopicIndex = item.topicIndex;
      const dragIndex = item.index;
      
      const hoverTopicIndex = topicIndex;
      const hoverIndex = index;

      const dragOrder = dragTopicIndex == hoverTopicIndex ? dragIndex : dragTopicIndex;
      const hoverOrder = dragTopicIndex == hoverTopicIndex ? hoverIndex : hoverTopicIndex;

      if (dragIndex === hoverIndex && dragTopicIndex === hoverTopicIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = 
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragOrder < hoverOrder && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragOrder > hoverOrder && hoverClientY > hoverMiddleY) {
        return;
      }

      moveQaItem(dragTopicIndex, dragIndex, hoverTopicIndex, hoverIndex);
      item.topicIndex = hoverTopicIndex;
      item.index = hoverIndex;

    },
  });

  const opacity = isDragging ? 0.5 : 1
  drag(drop(ref));

  return (
    <div className="card" ref={ref} data-handler-id={handlerId} style={{opacity}}>
      <div className="card-body">
        <div className={styles.titleRow}>
          <p className="fw-bold text-body">{title}</p>
          <EditorDropdownMenu 
            menuId={"dropdown-" + itemId}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
          />
        </div>
        <p className={"text-secondary " + styles.contents}>{contents}</p>
      </div>
    </div>
  )
};

const EditingItem = (props: EditingProps) => {
  const [title, setTitle] = useState(props.title);
  const [contents, setContents] = useState(props.contents);
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

          <EndEditingButtons 
            onClickDone={() => props.onClickDone(props)}
            onClickCancel={props.onClickCancel}
          />
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
  topicIndex,
  index,
  moveQaItem
}: QaDisplayItem) => {
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
        topicIndex={topicIndex} index={index}
        moveQaItem={moveQaItem}
      />
    );
  }
}
