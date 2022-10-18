type Props = {
  text?: string | number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

export const Badge: React.FC<Props> = ({ text, size = "md" }: Props) => {
  const classes = `flex justify-center truncate rounded bg-red-500 px-1 text-${size} text-white`;

  return <div className={classes}>{text}</div>;
};
