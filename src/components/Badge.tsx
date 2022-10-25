type Props = {
  text?: string | number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: string;
};

export const Badge = ({ text, size = "md", color = "bg-red-500" }: Props) => {
  const classes = `flex justify-center truncate rounded ${color} px-1 text-${size} text-white`;

  return <div className={classes}>{text}</div>;
};

export const RoundBadge = ({
  text,
  size = "md",
  color = "bg-red-500",
}: Props) => {
  const classes = `flex justify-center truncate rounded-full ${color} px-3 py-1 text-${size} text-white`;

  return (
    <div className={classes}>
      <span className="flex w-3 justify-center">{text}</span>
    </div>
  );
};
