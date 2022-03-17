import { QaContents, QaItem } from "../QaItem/QaItem";
import { DeleteQaItemCallback, MoveQaItemCallback, UpdateQaItemCallback } from "../TopicCollection/TopicCollection";
import styles from "./QaCollection.module.css";

type QaCollectionProps = {
  topicIndex: number;
  items: QaContents[];
  moveQa: MoveQaItemCallback;
  requestDeleteQaItem: DeleteQaItemCallback;
  requestUpdateQaItem: UpdateQaItemCallback
}

export const QaCollection = ({
  items,
  topicIndex,
  moveQa,
  requestDeleteQaItem,
  requestUpdateQaItem,
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
              requestUpdateItem={requestUpdateQaItem}
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
