import { MouseEventHandler } from "react";
import styles from "./Button.module.css";

export type ButtonProps = {
  variant?: string;
  text?: string;
  ariaLabel?: string;
  children?: JSX.Element;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button: React.FC<ButtonProps> = ({ variant = "primary", text, children, loading, ariaLabel, onClick }) => {
  const classes = `${styles.button} ${styles[variant]}`;

  if (loading) {
    return (
      <button className={classes} aria-label={ariaLabel} >
        <i className="fas fa-cog fa-spin"></i>
      </button>
    )
  }

  return (
    <button className={classes} aria-label={ariaLabel} onClick={onClick}>
      {text || children}
    </button>
  );
};


export * from "./JoinButton";