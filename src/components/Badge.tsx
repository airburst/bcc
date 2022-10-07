type Props = {
  text?: string | number;
};

export const Badge: React.FC<Props> = ({ text }) => {
  return (
    <div className="bg-red-500 text-white text-md font-medium px-3 rounded-md">
      {text}
    </div>
  );
};

