import { useRouter } from "next/router";

export const CancelButton = ({ ...props }) => {
  const router = useRouter();

  return (
    <button
      className="btn"
      type="button"
      onClick={() => router.push("/")}
      {...props}
    >
      Cancel
    </button>
  );
};
