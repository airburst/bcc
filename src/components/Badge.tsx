type Props = {
  text?: string | number;
};

export const Badge: React.FC<Props> = ({ text }: Props) => (
  <div className="flex justify-center truncate rounded bg-red-500 px-1 text-xs text-white">
    {text}
  </div>
);
