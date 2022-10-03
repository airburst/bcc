import styles from "./Badge.module.css";

type Props = {
  text: string;
};

export const Badge: React.FC<Props> = ({ text }) => {
  return (
    <div className={styles.container}>
      {text}
    </div>
  );
};
