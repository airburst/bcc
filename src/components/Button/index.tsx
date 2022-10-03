import { MouseEventHandler } from "react";
import styles from "./Button.module.css";

export type ButtonProps = {
  variant?: string;
  text?: string;
  children?: JSX.Element;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button: React.FC<ButtonProps> = ({ variant = "primary", text, children, loading, onClick }) => {
  const classes = `${styles.button} ${styles[variant]}`;

  if (loading) {
    return (
      <button className={classes} >
        <i className="fas fa-cog fa-spin"></i>
      </button>
    )
  }

  return (
    <button className={classes} onClick={onClick}>
      {text || children}
    </button>
  );
};


export * from "./JoinButton";