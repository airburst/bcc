type Props = {
  text?: string;
};

export const Loading: React.FC<Props> = ({ text }: Props) => (
  <div className="flex h-[80%] w-full flex-col items-center justify-center">
    <div className="pb-16 text-3xl">
      <div className="text-3xl">
        <i className="fas fa-cog fa-spin" />
      </div>
    </div>
    {text && <span>{text}</span>}
  </div>
);
