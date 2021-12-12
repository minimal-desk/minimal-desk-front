import { QaContents, QaItem } from "../QaItem/QaItem";
import styles from "./QaCollection.module.css";

export interface QaCollectionProps {
  items: QaContents[];
}

export const QaCollection = ({
  items,
  ...props
}: QaCollectionProps) => {
  return (
    <div>
      <ul className={styles.collection}>
        {items.map((item) =>
          <li key={item.itemId}>
            <QaItem 
              title={item.title} 
              contents={item.contents} 
              itemId={item.itemId} 
              onClickDelete={(i) => {}}
              onUpdate={(c)=>{}}
            />
          </li>
        )}
      </ul>
    </div>
  );
}
