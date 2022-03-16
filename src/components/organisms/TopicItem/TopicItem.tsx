import { FormattedMessage } from "react-intl";
import { QaCollection } from "../QaCollection/QaCollection";
import { QaContents } from "../QaItem/QaItem";
import styles from "./TopicItem.module.css";
import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../TopicCollection/TopicCollection";
import type { XYCoord, Identifier } from 'dnd-core'

export interface TopicContents {
  topicTitle: string;
  topicId: string;
  items: QaContents[];
}

export interface TopicDisplayItemProps extends TopicContents {
  index: number;
  moveTopic: (dragIndex: number, hoverIndex: number) => void;
  moveQa: (dragTopicIndex: number, dragQaIndex: number, 
    hoverTopicIndex: number, hoverQaIndex: number) => void;
  onClickDelete: (topicId: String) => void;
  onUpdate: (topicItem: TopicContents) => void;
}


interface StaticTopicHeaderProps extends TopicContents {
  index: number;
  moveTopic: (dragIndex: number, hoverIndex: number) => void;
  moveQa: (dragTopicIndex: number, dragQaIndex: number, 
    hoverTopicIndex: number, hoverQaIndex: number) => void;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

interface EditingTopicHeaderProps extends TopicContents {
  onClickCancel: () => void;
  onClickDone: (topicItem: TopicContents) => void;
}

interface DragItem {
  index: number;
  itemId: string;
}

export const TopicItem = ({
  topicTitle, 
  topicId, 
  items,
  index,
  moveTopic,
  moveQa,
  onClickDelete,
  onUpdate
}: TopicDisplayItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const ref = useRef<HTMLDivElement>(null)

  const [ { isDragging }, drag] = useDrag({
    type: ItemTypes.TOPIC,
    item: () => {
      return { topicId, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ handlerId }, drop] = useDrop<
    DragItem, 
    void, 
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.TOPIC,
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = 
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      
      const clientOffset = monitor.getClientOffset()

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveTopic(dragIndex, hoverIndex)

      item.index = hoverIndex

    },
  })

  drag(drop(ref));

  return(
    <div ref={ref} data-handler-id={handlerId} className="card bg-light">
      <div className="card-body">
        {
          isEditing
          ? <EditingTopicHeader 
              topicTitle={topicTitle} topicId={topicId} items={items} 
              onClickCancel={()=>{setIsEditing(false)}}
              onClickDone={(topicItem)=>{onUpdate(topicItem)}}
            />
          : <StaticTopicHeader 
              topicTitle={topicTitle} topicId={topicId} items={items}
              onClickEdit={()=>{setIsEditing(true)}}
              onClickDelete={()=>{onClickDelete(topicId)}}
              index={index}
              moveTopic={moveTopic}
              moveQa={moveQa}
            />
        }
        <QaCollection items={items} moveQa={moveQa} topicIndex={index} />
      </div>
    </div>
  );
}

const StaticTopicHeader = ({ topicTitle, topicId, index, moveTopic, onClickEdit, onClickDelete }: StaticTopicHeaderProps) => {

  

  return (
    <div 
      className="mx-2 d-flex flex-row justify-content-between align-items-center"
    >
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
          <button className="dropdown-item" onClick={()=>{onClickEdit()}}>
            <FormattedMessage id="TopicItem.Edit" defaultMessage="Edit topic name" />
          </button>
        </li>

        <li>
          <button className="dropdown-item" onClick={()=>{onClickDelete()}}>
            <FormattedMessage id="TopicItem.Delete" defaultMessage="Delete topic" />
          </button>
        </li>
      </ul>
      </div>
    </div>
  );
}

const EditingTopicHeader = (props: EditingTopicHeaderProps) => {
  const [title, setTitle] = useState(props.topicTitle);
  return (
    <div className="d-flex justify-content-between">
      <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      
      <button type="button" className="btn btn-secondary ms-4" onClick={props.onClickCancel}>
        <FormattedMessage id="TopicItem.Editing.Cancel" defaultMessage="Cancel" />
      </button>

      <button 
        type="button" 
        className="btn btn-primary" 
        onClick={() => props.onClickDone({topicTitle: props.topicTitle, topicId: props.topicId, items: props.items})}
      >
        <FormattedMessage id="TopicItem.Editing.Done" defaultMessage="Done" />
      </button>
    </div>
  );
}
