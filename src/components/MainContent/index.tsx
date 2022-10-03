import React from "react";
import styles from "./Main.module.css";

type Props = {
  children: JSX.Element,
};

export const MainContent: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};
