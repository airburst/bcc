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
      type = "button",
      variant,
      text,
      children,
      loading,
      disabled,
      ariaLabel,
      onClick,
    },
    ref
  ) => {
    // TODO: write out full class names for DaisyUI
    const classes = clsx(
      "btn",
      variant && `btn-${variant}`,
      loading && `btn-${loading}`,
      disabled && `btn-${disabled}`,
      "gap-2"
    );

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
