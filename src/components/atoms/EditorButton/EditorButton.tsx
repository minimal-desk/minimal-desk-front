import React from "react";
import styles from "./EditorButton.module.css";

type Props = JSX.IntrinsicElements["button"] & {
};

export const EditorButton: React.FC<Props> = React.memo(
  function EditorButton({ children, ...props }){
    return (
      <button
        className={"btn " + styles.menuButton}
        type="button"
        { ...props }
      >
        { children }
      </button>
    );
  }
);