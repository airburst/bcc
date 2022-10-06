import { useState, useCallback } from "react";
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Button, ButtonProps } from "./index";

type Props = ButtonProps & {
  userId?: string;
  rideId?: string;
  going?: boolean;
}

// Query factory
const joinOrLeave = (action: string) => (ride: Props) => {
  return fetch(`/api/${action}-ride`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ride)
  })
    .then((res) => res.json())
}
const join = joinOrLeave("join");
const leave = joinOrLeave("leave");

export const JoinButton: React.FC<Props> = ({ going, rideId, userId, ...props }) => {
  const [loading, setLoading] = useState<boolean>(false);
  // Get QueryClient from the context
  const queryClient = useQueryClient();
  const ride = { rideId, userId };

  const onSuccess = useCallback(() => {
    queryClient.invalidateQueries(["rides"]);
    setLoading(false);
  }, [queryClient]);

  const { mutate: joinRide } = useMutation(join, {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess
  });

  const { mutate: leaveRide } = useMutation(leave, {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess
  });

  return going
    ? (
      <Button {...props} variant="going" loading={loading} onClick={() => leaveRide(ride)}>
        <i className="fa-solid fa-check"></i>
      </Button>
    )
    : (
      <Button {...props} variant="join" loading={loading} onClick={() => joinRide(ride)}>
        <i className="fa-solid fa-plus"></i>
      </Button>
    )
    ;
};
