import { QaContents, QaItem } from "../QaItem/QaItem";
import styles from "./QaCollection.module.css";

type QaCollectionProps = {
  topicIndex: number;
  items: QaContents[];
  moveQa: (dragTopicIndex: number, dragQaIndex: number, 
    hoverTopicIndex: number, hoverQaIndex: number) => void;
    requestDeleteQaItem: (topicIndex: number, index: number) => void;
}

export const QaCollection = ({
  items,
  topicIndex,
  moveQa,
  requestDeleteQaItem,
  ...props
}: QaCollectionProps) => {
  return (
    <div>
      <ul className={styles.collection}>
        {items.map((item, index) =>
          <li key={item.itemId}>
            <QaItem 
              title={item.title} 
              contents={item.contents} 
              itemId={item.itemId} 
              requestDeleteQaItem={requestDeleteQaItem}
              onUpdate={(c)=>{}}
              topicIndex={topicIndex}
              index={index}
              moveQaItem={moveQa}
            />
          </li>
        )}
      </ul>
    </div>
  );
}
