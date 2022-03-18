import { QaCollection } from "../QaCollection/QaCollection";
import { DragQaItem, QaContents } from "../QaItem/QaItem";
import React, { useRef, useState, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { PrepareQaItemCallback, DeleteQaItemCallback, DeleteTopicCallback, ItemTypes, MoveQaItemCallback, MoveTopicCallback, UpdateQaItemCallback, UpdateTopicTitleCallback, AbortQaItemCallback, FixQaItemCallback, AbortTopicCallback, FixTopicCallback } from "../TopicCollection/TopicCollection";
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

export type NotifyEditingState = (isEditingStart: boolean) => void;

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
  requestPrepareQaItem: PrepareQaItemCallback;
  requestAbortQaItem: AbortQaItemCallback;
  requestFixQaItem: FixQaItemCallback;
  requestAbortTopic: AbortTopicCallback;
  requestFixTopic: FixTopicCallback;
  preparingQaItemIds: string[];
  isNewTopic?: boolean;
};

type StaticTopicHeaderProps = TopicContents & TopicItemDragProps & {
  onClickEdit: () => void;
  onClickDelete: () => void;
  requestPrepareQaItem: PrepareQaItemCallback;
  notifyEditingState: NotifyEditingState;
};

type EditingTopicHeaderProps = TopicContents & {
  onClickCancel: () => void;
  onClickDone: (topicTitle: string) => void;
  isNewTopic?: boolean;
};

type DragTopicItem = {
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
  requestUpdateQaItem,
  requestPrepareQaItem,
  requestAbortQaItem,
  requestFixQaItem,
  requestAbortTopic,
  requestFixTopic,
  preparingQaItemIds,
  isNewTopic,
}: TopicDisplayItemProps) => {
  const [isEditing, setIsEditing] = useState(isNewTopic);
  const [editingCount, setEditingCount] = useState(0)

  const notifyEditingState = useCallback<NotifyEditingState>((isEditingStart) => {
    setEditingCount((prevCount) => {
      return prevCount + (isEditingStart ? 1 : -1);
    })
  }, []);

  const onClickCancel = useCallback(() => {
    if (isNewTopic) {
      requestAbortTopic(topicId, index)
    } else {
      setIsEditing(false);
    }
  }, [topicId, index, isNewTopic]);

  const onClickDone = useCallback((topicTitle: string) => {
    if (isNewTopic) {
      requestFixTopic(topicId);
    }
    requestUpdateTopicTitle(index, topicTitle);
    setIsEditing(false);
  }, [topicId, index, isNewTopic]);

  const ref = useRef<HTMLDivElement>(null);

  const [ { isDragging }, drag] = useDrag({
    type: ItemTypes.TOPIC,
    item: () => {
      return { topicId, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag(_){
      return !isEditing && editingCount == 0;
    }
  });


  const [{ handlerId }, drop] = useDrop<
    DragTopicItem | DragQaItem, 
    void, 
    { handlerId: Identifier | null }
  >({
    accept: [ItemTypes.TOPIC, ItemTypes.QA],
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() }
    },
    hover(anyItem: any, monitor) {

      if (typeof anyItem.topicIndex === "number") {
        const item = anyItem as DragQaItem;

        if (items.length > 0) {
          return;
        }

        if (!ref.current) {
          return;
        }

        moveQa(item.topicIndex, item.index, index, 0);
        item.topicIndex = index;
        item.index = 0;

      } else {
        const item = anyItem as DragTopicItem

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
      }
    },
  });

  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));

  return(
    <div ref={ref} data-handler-id={handlerId} className="card bg-light" style={{opacity}}>
      <div className="card-body">
        {
          isEditing
          ? <EditingTopicHeader 
              topicTitle={topicTitle} topicId={topicId} items={items} 
              onClickCancel={onClickCancel}
              onClickDone={onClickDone}
              isNewTopic={isNewTopic}
            />
          : <StaticTopicHeader 
              topicTitle={topicTitle} topicId={topicId} items={items}
              onClickEdit={()=>{setIsEditing(true)}}
              onClickDelete={()=>{requestDeleteTopic(index)}}
              index={index}
              moveTopic={moveTopic}
              moveQa={moveQa}
              requestPrepareQaItem={requestPrepareQaItem}
              notifyEditingState={notifyEditingState}
            />
        }
        <QaCollection 
          items={items} 
          moveQa={moveQa} 
          topicIndex={index} 
          requestDeleteQaItem={requestDeleteQaItem} 
          requestUpdateQaItem={requestUpdateQaItem}
          requestAbortQaItem={requestAbortQaItem}
          requestFixQaItem={requestFixQaItem}
          preparingQaItemIds={preparingQaItemIds}
          notifyEditingState={notifyEditingState} 
        />
      </div>
    </div>
  );
}

const StaticTopicHeader = ({ index, topicTitle, topicId, onClickEdit, onClickDelete, requestPrepareQaItem, notifyEditingState }: StaticTopicHeaderProps) => {
  const { formatMessage } = useIntl();

  return (
    <div 
      className="mx-2 d-flex flex-row justify-content-between align-items-center"
    >
      <div className="fw-bold lead">{topicTitle}</div>
      <div>
        <EditorButton
          onClick={()=>{
            requestPrepareQaItem(index, 0);
            notifyEditingState(true);
          }}
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
        isNewItem={props.isNewTopic}
      />
    </div>
  );
}
