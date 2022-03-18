import { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TopicContents, TopicItem } from "../TopicItem/TopicItem";
import update from "immutability-helper";
import styles from "./TopicCollection.module.css";
import { QaContents } from "../QaItem/QaItem";
import { v4 as uuidv4 } from "uuid"; 
import { FormattedMessage } from "react-intl";

type TopicCollectionProps = {
  topicItems: TopicContents[];
};

export const ItemTypes = {
  TOPIC: "topic",
  QA: "qa"
}

export type MoveTopicCallback = (dragIndex: number, hoverIndex: number) => void;
export type MoveQaItemCallback = (dragTopicIndex: number, dragQaIndex: number, 
  hoverTopicIndex: number, hoverQaIndex: number) => void;

export type DeleteTopicCallback = (topicIndex: number) => void;
export type DeleteQaItemCallback = (topicIndex: number, itemIndex: number) => void;

export type UpdateTopicTitleCallback = (topicIndex: number, newTitle: string) => void;
export type UpdateQaItemCallback = (topicIndex: number, itemIndex: number, contents: QaContents) => void;

export type PrepareTopicCallback = (insertIndex: number) => void;
export type PrepareQaItemCallback = (topicIndex: number, itemIndex: number) => void;

export type AbortTopicCallback = (topicId: string, topicIndex: number) => void;
export type AbortQaItemCallback = (itemId: string, topicIndex: number, itemIndex: number) => void;

export type FixTopicCallback = (topicId: string) => void;
export type FixQaItemCallback = (itemId: string) => void;

export const TopicCollection = ({
  topicItems,
  ...props
}: TopicCollectionProps) => {

  const [items, setItems] = useState(topicItems);
  const [preparingQaItemIds, setPreparingQaItemIds] = useState<string[]>([]);
  const [preparingTopicIds, setPreparingTopicIds] = useState<string[]>([]);

  const moveTopicItem = useCallback<MoveTopicCallback>((dragIndex, hoverIndex) => {
    setItems((prevItems: TopicContents[]) => 
      update(prevItems, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevItems[dragIndex]]
        ],
      }),
    );
  }, []);

  const moveQaItem = useCallback<MoveQaItemCallback>((dragTopicIndex, dragQaIndex, hoverTopicIndex, hoverQaIndex) => {
    setItems((prevItems) => {
      const removed = update(prevItems, { [dragTopicIndex]: { items: { $splice: [[dragQaIndex, 1]] } } });
      const inserted = update(removed, { [hoverTopicIndex]: { items: { $splice: [[hoverQaIndex, 0, prevItems[dragTopicIndex].items[dragQaIndex]]]}}});
      return inserted;
    });
  }, []);

  const deleteTopic = useCallback<DeleteTopicCallback>((topicIndex) => {
    setItems((prevItems) =>
      update(prevItems, { $splice: [[topicIndex, 1]] })
    );
  },[])

  const deleteQaItem = useCallback<DeleteQaItemCallback>((topicIndex, itemIndex) => {
    setItems((prevItems) => 
      update(prevItems, { [topicIndex]: { items: { $splice: [[itemIndex, 1]] } } })
    );
  }, []);

  const updateTopicTitle = useCallback<UpdateTopicTitleCallback>((topicIndex, newTitle) => {
    setItems((prevItems) => 
      update(prevItems, {[topicIndex]: {topicTitle: { $set: newTitle }}})
    );
  }, []);

  const updateQaItem = useCallback<UpdateQaItemCallback>((topicIndex, itemIndex, contents) => {
    setItems((prevItems) =>
      update(prevItems, {[topicIndex]: {items: { $splice: [[itemIndex, 1, contents]] }}})
    );
  }, []);

  const prepareTopic = useCallback<PrepareTopicCallback>((insertIndex) => {
    const newItem: TopicContents = { topicTitle: "", topicId: uuidv4(), items: [] };
    setPreparingTopicIds((prevIds) => 
      update(prevIds, {$push: [newItem.topicId]})
    );
    setItems((prevItems) => 
      update(prevItems, { $splice: [[insertIndex, 0, newItem]] })
    );
  }, []);

  const prepareQaItem = useCallback<PrepareQaItemCallback>((topicIndex, insertItemIndex) => {
    const newItem: QaContents = { itemId: uuidv4(), title: "", contents: "" };
    setPreparingQaItemIds((prevIds) =>
      update(prevIds, {$push: [newItem.itemId]})
    );
    setItems((prevItems) => 
      update(prevItems, { [topicIndex]: { items: { $splice: [[insertItemIndex, 0, newItem]]}}})
    );
  }, []);

  const abortTopic = useCallback<AbortTopicCallback>((topicId, topicIndex) => {
    deleteTopic(topicIndex);
    fixTopic(topicId);
  }, []);

  const abortQaItem = useCallback<AbortQaItemCallback>((itemId, topicIndex, itemIndex) => {
    deleteQaItem(topicIndex, itemIndex);
    fixQaItem(itemId);
  }, []);

  const fixTopic = useCallback<FixTopicCallback>((topicId) => {
    setPreparingTopicIds((prevIds) => 
      update(prevIds, { $splice: [[prevIds.indexOf(topicId), 1]] })
    );
  }, []);

  const fixQaItem = useCallback<FixQaItemCallback>((itemId) => {
    setPreparingQaItemIds((prevIds) => 
      update(prevIds, { $splice: [[prevIds.indexOf(itemId), 1]] })
    );
  }, []);

  return(
    <DndProvider backend={HTML5Backend}>
      <div>

        <div 
          className="d-flex flex-row justify-content-between align-items-center"
        >
          <div>
            <button type="button" className="btn btn-outline-secondary">
              <FormattedMessage id="TopicCollection.Preview" defaultMessage="Preview"/>
            </button>
            <button type="button" className="btn btn-outline-secondary">
              <FormattedMessage id="TopicCollection.EmbedCode" defaultMessage="Embed Code"/>
            </button>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => {prepareTopic(0)}}>
            <FormattedMessage id="TopicCollection.AddTopic" defaultMessage="Add Topic"/>
          </button>
        </div>
        <ul className={styles.collection}>
          {items.map((topicItem, index) =>
            <li key={topicItem.topicId} className="mb-4">
              <TopicItem
                topicTitle={topicItem.topicTitle} 
                topicId={topicItem.topicId}
                items={topicItem.items}
                requestDeleteTopic={deleteTopic}
                requestDeleteQaItem={deleteQaItem}
                requestUpdateTopicTitle={updateTopicTitle}
                requestUpdateQaItem={updateQaItem}
                requestAbortQaItem={abortQaItem}
                requestFixQaItem={fixQaItem}
                requestAbortTopic={abortTopic}
                requestFixTopic={fixTopic}
                index={index}
                moveTopic={moveTopicItem}
                moveQa={moveQaItem}
                requestPrepareQaItem={prepareQaItem}
                preparingQaItemIds={preparingQaItemIds}
                isNewTopic={preparingTopicIds.includes(topicItem.topicId)}
              />
            </li>
          )}
        </ul>
      </div>
    </DndProvider>
  );
}