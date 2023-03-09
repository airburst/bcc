import { useRouter } from "next/router";

export const CancelButton = ({ ...props }) => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="btn"
      {...props}
      onClick={() => router.push("/")}
    >
      Cancel
    </button>
  );
};
