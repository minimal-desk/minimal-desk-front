import { QaCollection } from "../QaCollection/QaCollection";
import { QaContents } from "../QaItem/QaItem";
import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DeleteQaItemCallback, DeleteTopicCallback, ItemTypes, MoveQaItemCallback, MoveTopicCallback, UpdateQaItemCallback, UpdateTopicTitleCallback } from "../TopicCollection/TopicCollection";
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
  moveTopic: MoveTopicCallback;
  moveQa: MoveQaItemCallback;
};

type TopicDisplayItemProps = TopicContents & TopicItemDragProps & {
  requestDeleteTopic: DeleteTopicCallback;
  requestDeleteQaItem: DeleteQaItemCallback;
  requestUpdateTopicTitle: UpdateTopicTitleCallback;
  requestUpdateQaItem: UpdateQaItemCallback;
};

type StaticTopicHeaderProps = TopicContents & TopicItemDragProps & {
  onClickEdit: () => void;
  onClickDelete: () => void;
};

type EditingTopicHeaderProps = TopicContents & {
  onClickCancel: () => void;
  onClickDone: (topicTitle: string) => void;
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
  requestUpdateTopicTitle,
  requestUpdateQaItem
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
                (newTitle)=>{
                  setIsEditing(false);
                  requestUpdateTopicTitle(index, newTitle);
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
        <QaCollection items={items} moveQa={moveQa} topicIndex={index} requestDeleteQaItem={requestDeleteQaItem} requestUpdateQaItem={requestUpdateQaItem} />
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
        onClickDone={() => {props.onClickDone(title)}}
        onClickCancel={props.onClickCancel} 
      />
    </div>
  );
}
