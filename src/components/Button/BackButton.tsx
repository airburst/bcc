import { useRouter } from "next/router";
import { Button } from "./index";

type ButtonProps = {
  url?: string;
};

export const BackButton = ({ url, ...props }: ButtonProps) => {
  const router = useRouter();

  const goBack = () => {
    if (url) {
      router.push(url);
    } else {
      router.back();
    }
  };

  return (
    <Button variant="secondary" {...props} onClick={goBack}>
      <i className="fa-solid fa-chevron-left" />
      Back
    </Button>
  );
};
