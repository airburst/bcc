type Props = {
  text?: string;
}

export const Loading: React.FC<Props> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[80%]">
      <div className="text-3xl pb-16">
        <div className="text-3xl">
          <i className="fas fa-cog fa-spin"></i>
        </div>
      </div>
      {text && (
        <span>{text}</span>
      )}
    </div>
  );
};


