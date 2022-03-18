import { QaContents, QaItem } from "../QaItem/QaItem";
import { AbortQaItemCallback, DeleteQaItemCallback, FixQaItemCallback, MoveQaItemCallback, UpdateQaItemCallback } from "../TopicCollection/TopicCollection";
import { NotifyEditingState } from "../TopicItem/TopicItem";
import styles from "./QaCollection.module.css";

type QaCollectionProps = {
  topicIndex: number;
  items: QaContents[];
  moveQa: MoveQaItemCallback;
  requestDeleteQaItem: DeleteQaItemCallback;
  requestUpdateQaItem: UpdateQaItemCallback;
  requestAbortQaItem: AbortQaItemCallback;
  requestFixQaItem: FixQaItemCallback;
  preparingQaItemIds: string[]; 
  notifyEditingState: NotifyEditingState;
}

export const QaCollection = ({
  items,
  topicIndex,
  moveQa,
  requestDeleteQaItem,
  requestUpdateQaItem,
  requestAbortQaItem,
  requestFixQaItem,
  preparingQaItemIds,
  notifyEditingState
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
              requestAbortQaItem={requestAbortQaItem}
              requestFixQaItem={requestFixQaItem}
              topicIndex={topicIndex}
              index={index}
              moveQaItem={moveQa}
              isNewItem={preparingQaItemIds.includes(item.itemId)}
              notifyEditingState={notifyEditingState}
            />
          </li>
        )}
      </ul>
    </div>
  );
}
