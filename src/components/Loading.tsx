type Props = {
  text?: string;
};

export const Loading: React.FC<Props> = ({ text }: Props) => (
  <>
    <div className="absolute z-20 flex h-full w-full flex-col items-center justify-center ">
      <div className="pb-16 text-2xl">
        <div className="text-5xl">
          <i className="fas fa-cog fa-spin" />
        </div>
      </div>
      {text && <span>{text}</span>}
    </div>
    <div className="absolute z-10 flex h-full w-full bg-white opacity-50" />
  </>
);
