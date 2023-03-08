/* eslint-disable react/button-has-type */
import { forwardRef, ReactNode } from "react";
import clsx from "clsx";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  variant?: string;
  text?: string;
  ariaLabel?: string;
  children?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

// TODO:
// icon prop -> (create variants with SVGs)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      type = "button",
      text,
      children,
      loading,
      disabled,
      ariaLabel,
      onClick,
    },
    ref
  ) => {
    const classes = clsx(
      "btn",
      variant && `btn-${variant}`,
      loading && `btn-${loading}`,
      disabled && `btn-${disabled}`,
      "gap-2"
    );

    // switch (variant) {
    //   case "primary":
    //     classes += " bg-blue-500 hover:bg-blue-600";
    //     break;
    //   case "secondary":
    //     classes += " bg-neutral-200 text-neutral-900 hover:bg-neutral-300";
    //     break;
    //   case "going":
    //     classes += " bg-green-700 hover:bg-green-800";
    //     break;
    //   case "join":
    //     classes += " bg-red-700 hover:bg-red-800";
    //     break;
    //   case "red":
    //     classes += " bg-red-700 hover:bg-red-800";
    //     break;
    //   case "cancel":
    //     classes += " bg-neutral-200 text-neutral-900 hover:bg-neutral-300";
    //     break;
    //   case "custom":
    //     break;
    //   default: // primary
    //     classes += " bg-blue-500 hover:bg-blue-600";
    //     break;
    // }

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
