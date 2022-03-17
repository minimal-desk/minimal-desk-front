import { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TopicContents, TopicItem } from "../TopicItem/TopicItem";
import update from "immutability-helper";
import styles from "./TopicCollection.module.css";
import { QaContents } from "../QaItem/QaItem";


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

export const TopicCollection = ({
  topicItems,
  ...props
}: TopicCollectionProps) => {

  const [items, setItems] = useState(topicItems)
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
    setItems((prevItems: TopicContents[]) => {
      const removed = update(prevItems, { [dragTopicIndex]: { items: { $splice: [[dragQaIndex, 1]] } } });
      const inserted = update(removed, { [hoverTopicIndex]: { items: { $splice: [[hoverQaIndex, 0, prevItems[dragTopicIndex].items[dragQaIndex]]]}}});
      return inserted;
    });
  }, []);

  const deleteTopic = useCallback<DeleteTopicCallback>((topicIndex: number) => {
    setItems((prevItems: TopicContents[]) =>
      update(prevItems, { $splice: [[topicIndex, 1]] })
    );
  },[])

  const deleteQaItem = useCallback<DeleteQaItemCallback>((topicIndex: number, itemIndex: number) => {
    setItems((prevItems: TopicContents[]) => 
      update(prevItems, { [topicIndex]: { items: { $splice: [[itemIndex, 1]] } } })
    );
  }, []);

  const updateTopicTitle = useCallback<UpdateTopicTitleCallback>((topicIndex: number, newTitle: string) => {
    setItems((prevItems: TopicContents[]) => 
      update(prevItems, {[topicIndex]: {topicTitle: { $set: newTitle }}})
    );
  }, []);

  const updateQaItem = useCallback<UpdateQaItemCallback>((topicIndex: number, itemIndex: number, contents: QaContents) => {
    setItems((prevItems: TopicContents[]) =>
      update(prevItems, {[topicIndex]: {items: { $splice: [[itemIndex, 1, contents]] }}})
    );
  }, []);

  return(
    <DndProvider backend={HTML5Backend}>
      <div>
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
                index={index}
                moveTopic={moveTopicItem}
                moveQa={moveQaItem}
              />
            </li>
          )}
        </ul>
      </div>
    </DndProvider>
  );
}