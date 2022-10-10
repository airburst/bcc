import { useRouter } from "next/router";
// import { ChevronLeftIcon } from "../"

type ButtonProps = {
  children?: string;
}

export const BackButton = ({ children, ...props }: ButtonProps) => {
  const router = useRouter();

  return (
    <button className="flex items-center h-8 text-white bg-blue-500 text-lg  hover:bg-blue-600 rounded px-6 p-5" {...props} onClick={() => router.back()}>
      {children || (
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-chevron-left"></i>
          <span>Back</span>
        </div>
      )}
    </button>
  );
}
