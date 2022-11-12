/* eslint-disable react/button-has-type */
import { forwardRef } from "react";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: string;
  text?: string;
  ariaLabel?: string;
  children?: JSX.Element;
  loading?: boolean;
  disabled?: boolean;
}

// TODO: focus ring style

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      type = "button",
      text,
      className,
      children,
      loading,
      disabled,
      ariaLabel,
      onClick,
    },
    ref
  ) => {
    let classes =
      `px-6 h-full text-white text-lg rounded disabled:bg-neutral-200 disabled:text-neutral-500 disabled:cursor-not-allowed ${className}` ||
      "";

    switch (variant) {
      case "primary":
        classes += " bg-blue-500 hover:bg-blue-600";
        break;
      case "secondary":
        classes += " bg-neutral-200 text-neutral-900 hover:bg-neutral-300";
        break;
      case "going":
        classes += " bg-green-700 hover:bg-green-800";
        break;
      case "join":
        classes += " bg-red-700 hover:bg-red-800";
        break;
      case "red":
        classes += " bg-red-700 hover:bg-red-800";
        break;
      case "cancel":
        classes += " bg-neutral-200 text-neutral-900 hover:bg-neutral-300";
        break;
      case "custom":
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
        ref={ref}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        disabled={disabled}
      >
        {text || children}
      </button>
    );
  }
);
