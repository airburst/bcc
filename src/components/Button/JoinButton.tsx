import { useState, useCallback, MouseEventHandler } from "react";
import { Button, ButtonProps } from "./index";

type Props = ButtonProps & {
  userId?: string;
  rideId?: string;
  going?: boolean;
}

export const JoinButton: React.FC<Props> = ({ going, rideId, userId, ...props }) => {
  const [joining, setJoining] = useState<boolean>(false);
  const [isGoing, setIsGoing] = useState<boolean | undefined>(going);

  const fakeJoinHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    try {
      setJoining(true);
      fetch("/api/add-rider", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rideId, userId })
      })
        .then((res) => res.json())
        .then(() => {
          setIsGoing(true);
          setJoining(false);
        })
    } catch (err) {
      console.error(err);
    }
  }, [rideId, userId]);

  const fakeUnjoinHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setJoining(true);
    console.log("Remove rider", userId); // FIXME:
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
