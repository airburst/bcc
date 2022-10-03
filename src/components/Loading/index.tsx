import styles from "./Loading.module.css";

type Props = {
  text?: string;
}

export const Loading: React.FC<Props> = ({ text }) => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className="fa-3x">
          <i className="fas fa-cog fa-spin"></i>
        </div>
      </div>
      {text && (
        <span className={styles.text}>{text}</span>
      )}
    </div>
  );
};
