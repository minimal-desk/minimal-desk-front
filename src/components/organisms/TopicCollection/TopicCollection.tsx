import { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TopicContents, TopicItem } from "../TopicItem/TopicItem";
import update from "immutability-helper";
import styles from "./TopicCollection.module.css";


interface TopicCollectionProps {
  topicItems: TopicContents[];
}

export const ItemTypes = {
  TOPIC: "topic",
  QA: "qa"
}

export const TopicCollection = ({
  topicItems,
  ...props
}: TopicCollectionProps) => {

  const [items, setItems] = useState(topicItems)
  const moveTopicItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setItems((prevItems: TopicContents[]) => 
      update(prevItems, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevItems[dragIndex]]
        ],
      }),
    );
  }, []);


  const moveQaItem = useCallback((
    dragTopicIndex: number, dragQaIndex: number, 
    hoverTopicIndex: number, hoverQaIndex: number) => {
    setItems((prevItems: TopicContents[]) => {
      const copied = [...prevItems];
      const qaItem = [...prevItems][dragTopicIndex].items[dragQaIndex];
      copied[dragTopicIndex].items.splice(dragQaIndex, 1);
      copied[hoverTopicIndex].items.splice(hoverQaIndex, 0, qaItem);
      return copied;
    });
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
                onClickDelete={()=>{}}
                onUpdate={()=>{}}
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