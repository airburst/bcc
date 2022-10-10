type Props = {
  text?: string | number;
};

export const Badge: React.FC<Props> = ({ text }: Props) => (
  <div className="text-md rounded-md bg-red-500 px-3 font-medium text-white">
    {text}
  </div>
);
