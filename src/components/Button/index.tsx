import { MouseEventHandler } from "react";

export type ButtonProps = {
  className?: string;
  variant?: string;
  text?: string;
  ariaLabel?: string;
  children?: JSX.Element;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

// TODO: focus ring style

export const Button: React.FC<ButtonProps> = ({ variant = "primary", text, className, children, loading, ariaLabel, onClick }) => {
  let classes = "px-4 h-full text-white text-lg " + className || "";

  switch (variant) {
    case "going":
      classes += " font-bold bg-green-500 hover:bg-green-600";
      break;
    case "join":
      classes += " font-bold bg-red-500 hover:bg-red-600";
      break;
    default: // primary
      classes += " bg-blue-500 hover:bg-blue-600";
      break;
  }

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

export * from "./CardJoinButton";
export * from "./JoinButton";
export * from "./BackButton";
