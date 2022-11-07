import { useRouter } from "next/router";

type ButtonProps = {
  children?: string;
  url?: string;
};

export const BackButton = ({ url, children, ...props }: ButtonProps) => {
  const router = useRouter();

  const goBack = () => {
    if (url) {
      router.push(url);
    } else {
      router.back();
    }
  };

  return (
    <button
      type="button"
      className="flex h-8 items-center rounded bg-blue-600 p-5 px-6 text-lg text-white hover:bg-blue-700"
      {...props}
      onClick={goBack}
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
