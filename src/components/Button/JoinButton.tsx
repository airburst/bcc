import { useState } from "react";
import { useSWRConfig } from 'swr'
import { join, leave } from "../../hooks";
import { Button, ButtonProps } from "./index";

type Props = ButtonProps & {
  userId?: string;
  rideId?: string;
  going?: boolean;
}

export const JoinButton: React.FC<Props> = ({ going, rideId, userId, ...props }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const ride = { rideId, userId };
  const { mutate } = useSWRConfig();

  const handleJoin = async () => {
    // const options = { optimisticData: user, rollbackOnError: true }
    setLoading(true);
    await mutate('/api/join-ride', () => join(ride));
    setLoading(false);
  }

  const handleLeave = async () => {
    // const options = { optimisticData: user, rollbackOnError: true }
    setLoading(true);
    await mutate('/api/leave-ride', () => leave(ride));
    setLoading(false);
  }

  return going
    ? (
      <Button {...props} variant="going" loading={loading} onClick={handleLeave}>
        <>Going</>
      </Button>
    )
    : (
      <Button {...props} variant="join" loading={loading} onClick={handleJoin}>
        <>Join</>
      </Button>
    )
    ;
};
