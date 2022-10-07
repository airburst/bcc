type Props = {
  text: string;
};

export const Badge: React.FC<Props> = ({ text }) => {
  return (
    <div className="bg-blue-400 text-white text-md font-medium px-2 rounded">
      {text}
    </div>
  );
};

