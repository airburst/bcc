import { useState, useCallback, MouseEventHandler } from "react";
import { useQueryClient } from '@tanstack/react-query'

import { Button, ButtonProps } from "./index";

type Props = ButtonProps & {
  userId?: string;
  rideId?: string;
  going?: boolean;
}

export const JoinButton: React.FC<Props> = ({ going, rideId, userId, ...props }) => {
  const [joining, setJoining] = useState<boolean>(false);
  const [isGoing, setIsGoing] = useState<boolean | undefined>(going);
  // Get QueryClient from the context
  const queryClient = useQueryClient();

  // console.log("Re-render JoinButton"); // FIXME:


  const joinHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    try {
      setJoining(true);
      fetch("/api/join-ride", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rideId, userId })
      })
        .then((res) => res.json())
        .then(() => {
          queryClient.invalidateQueries(['rides']);
          setIsGoing(true);
          setJoining(false);
        })
    } catch (err) {
      console.error(err);
    }
  }, [rideId, userId, queryClient]);

  const unjoinHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    try {
      setJoining(true);
      fetch("/api/leave-ride", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rideId, userId })
      })
        .then((res) => res.json())
        .then(() => {
          queryClient.invalidateQueries(['rides']);
          setIsGoing(false);
          setJoining(false);
        })
    } catch (err) {
      console.error(err);
    }
  }, [rideId, userId, queryClient]);

  return isGoing
    ? (
      <Button {...props} variant="going" loading={joining} onClick={unjoinHandler}>
        <i className="fa-solid fa-check"></i>
      </Button>
    )
    : (
      <Button {...props} variant="join" loading={joining} onClick={joinHandler}>
        <i className="fa-solid fa-plus"></i>
      </Button>
    )
    ;
};
