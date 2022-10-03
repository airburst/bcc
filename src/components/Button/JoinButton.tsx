import { useState, MouseEventHandler } from "react";
import { Button, ButtonProps } from "./index";

type Props = ButtonProps & {
  going?: string;
}

export const JoinButton: React.FC<Props> = ({ going, ...props }) => {
  const [joining, setJoining] = useState<boolean>(false);
  const [isGoing, setIsGoing] = useState<boolean>(going === "1");

  const fakeJoinHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setJoining(true);
    setTimeout(() => {
      setIsGoing(true);
      setJoining(false);
    }, 600);
  };

  const fakeUnjoinHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setJoining(true);
    setTimeout(() => {
      setIsGoing(false);
      setJoining(false);
    }, 600);
  };

  return isGoing
    ? (
      <Button {...props} variant="going" loading={joining} onClick={fakeUnjoinHandler}>
        <i className="fa-solid fa-check"></i>
      </Button>
    )
    : (
      <Button {...props} variant="join" loading={joining} onClick={fakeJoinHandler}>
        <i className="fa-solid fa-plus"></i>
      </Button>
    )
    ;
};
