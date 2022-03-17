import { FormattedMessage } from "react-intl";
import { QaCollection } from "../QaCollection/QaCollection";
import { QaContents } from "../QaItem/QaItem";
import styles from "./TopicItem.module.css";
import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../TopicCollection/TopicCollection";
import type { XYCoord, Identifier } from 'dnd-core'
import { EndEditingButtons } from "../../molecules/EndItemEditingControls/EndEditingButtons";
import { EditorDropdownMenu } from "../../molecules/DropdownMenu/DropdownMenu";
import { EditorButton } from "../../atoms/EditorButton/EditorButton";
import { useIntl } from "react-intl";

export type TopicContents = {
  topicTitle: string;
  topicId: string;
  items: QaContents[];
};

type TopicItemDragProps = {
  index: number;
  moveTopic: (dragIndex: number, hoverIndex: number) => void;
  moveQa: (dragTopicIndex: number, dragQaIndex: number, 
    hoverTopicIndex: number, hoverQaIndex: number) => void;
};

type TopicDisplayItemProps = TopicContents & TopicItemDragProps & {
  requestDeleteTopic: (index: number) => void;
  requestDeleteQaItem: (topicIndex: number, index: number) => void;
  onUpdate: (topicItem: TopicContents) => void;
};

type StaticTopicHeaderProps = TopicContents & TopicItemDragProps & {
  onClickEdit: () => void;
  onClickDelete: () => void;
};

type EditingTopicHeaderProps = TopicContents & {
  onClickCancel: () => void;
  onClickDone: (topicItem: TopicContents) => void;
};

type DragItem = {
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
  requestDeleteTopic,
  requestDeleteQaItem,
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
    canDrag(_){
      return !isEditing
    }
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
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = 
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveTopic(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  })

  const opacity = isDragging ? 0.5 : 1
  drag(drop(ref));

  return(
    <div ref={ref} data-handler-id={handlerId} className="card bg-light" style={{opacity}}>
      <div className="card-body">
        {
          isEditing
          ? <EditingTopicHeader 
              topicTitle={topicTitle} topicId={topicId} items={items} 
              onClickCancel={()=>{setIsEditing(false)}}
              onClickDone={
                (topicItem)=>{
                  setIsEditing(false);
                  onUpdate(topicItem);
                }}
            />
          : <StaticTopicHeader 
              topicTitle={topicTitle} topicId={topicId} items={items}
              onClickEdit={()=>{setIsEditing(true)}}
              onClickDelete={()=>{requestDeleteTopic(index)}}
              index={index}
              moveTopic={moveTopic}
              moveQa={moveQa}
            />
        }
        <QaCollection items={items} moveQa={moveQa} topicIndex={index} requestDeleteQaItem={requestDeleteQaItem} />
      </div>
    </div>
  );
}

const StaticTopicHeader = ({ topicTitle, topicId, onClickEdit, onClickDelete }: StaticTopicHeaderProps) => {
  const { formatMessage } = useIntl();

  return (
    <div 
      className="mx-2 d-flex flex-row justify-content-between align-items-center"
    >
      <div className="fw-bold lead">{topicTitle}</div>
      <div>
        <EditorButton
          onClick={()=>{}}
        >
          <i className="bi bi-plus"></i>
        </EditorButton>

        <EditorDropdownMenu
          menuId={"dropdown-" + topicId}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete} 
          editButtonTitle={formatMessage({id: "TopicItem.Menu.Edit", defaultMessage: "Edit Topic Title"})}
          deleteButtonTitle={formatMessage({id: "TopicItem.Menu.Delete", defaultMessage: "Delete Topic"})}
        />
      </div>
    </div>
  );
}

const EditingTopicHeader = (props: EditingTopicHeaderProps) => {
  const [title, setTitle] = useState(props.topicTitle);
  return (
    <div className="d-flex justify-content-between">
      <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      
      <EndEditingButtons
        onClickDone={() => {props.onClickDone(props)}}
        onClickCancel={props.onClickCancel} 
      />
    </div>
  );
}
