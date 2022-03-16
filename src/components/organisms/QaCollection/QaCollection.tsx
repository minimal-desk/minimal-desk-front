import { QaContents, QaItem } from "../QaItem/QaItem";
import styles from "./QaCollection.module.css";

export interface QaCollectionProps {
  topicIndex: number;
  items: QaContents[];
  moveQa: (dragTopicIndex: number, dragQaIndex: number, 
    hoverTopicIndex: number, hoverQaIndex: number) => void;
}

export const QaCollection = ({
  items,
  topicIndex,
  moveQa,
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
              onClickDelete={(i) => {}}
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
