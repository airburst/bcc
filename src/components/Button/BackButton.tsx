import { useRouter } from "next/router";

type ButtonProps = {
  children?: string;
};

export const BackButton = ({ children, ...props }: ButtonProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="flex h-8 items-center rounded bg-blue-500 p-5  px-6 text-lg text-white hover:bg-blue-600"
      {...props}
      onClick={() => router.back()}
    >
      {children || (
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-chevron-left" />
          <span>Back</span>
        </div>
      )}
    </button>
  );
};
