import { useRouter } from "next/router";

export const CancelButton = ({ ...props }) => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="flex h-8 items-center justify-center rounded bg-neutral-200 p-5 px-6 text-lg text-neutral-900 hover:bg-neutral-300"
      {...props}
      onClick={() => router.push("/")}
    >
      Cancel
    </button>
  );
};
