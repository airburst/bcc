/* eslint-disable react/button-has-type */
import { MouseEventHandler } from "react";

export type ButtonProps = {
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: string;
  text?: string;
  ariaLabel?: string;
  children?: JSX.Element;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

// TODO: focus ring style

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  type = "button",
  text,
  className,
  children,
  loading,
  ariaLabel,
  onClick,
}: ButtonProps) => {
  let classes = `px-6 h-full text-white text-lg rounded ${className}` || "";

  switch (variant) {
    case "going":
      classes += " bg-green-700 hover:bg-green-800";
      break;
    case "join":
      classes += " bg-red-700 hover:bg-red-800";
      break;
    case "cancel":
      classes += " bg-neutral-200 text-neutral-900 hover:bg-neutral-300";
      break;
    default: // primary
      classes += " bg-blue-500 hover:bg-blue-600";
      break;
  }

  if (loading) {
    return (
      <button type="button" className={classes} aria-label={ariaLabel}>
        <i className="fas fa-cog fa-spin" />
      </button>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {text || children}
    </button>
  );
};
