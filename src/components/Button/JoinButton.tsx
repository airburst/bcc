import { useState } from "react";
import { useSWRConfig } from "swr";
import { join, leave } from "../../hooks";
import { Button, ButtonProps } from "./Button";
import { PlusIcon, CloseIcon } from "../Icon";

type Props = ButtonProps & {
  userId?: string;
  rideId?: string;
  going?: boolean;
};

export const JoinButton: React.FC<Props> = ({
  going,
  rideId,
  userId,
  ...props
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const ride = { rideId, userId };
  const { mutate } = useSWRConfig();

  const handleJoin = async () => {
    // const options = { optimisticData: user, rollbackOnError: true }
    setLoading(true);
    await mutate(`/api/ride/${rideId}`, () => join(ride));
    setLoading(false);
  };

  const handleLeave = async () => {
    // const options = { optimisticData: user, rollbackOnError: true }
    setLoading(true);
    await mutate(`/api/ride/${rideId}`, () => leave(ride));
    setLoading(false);
  };

  return going ? (
    <Button {...props} success loading={loading} onClick={handleLeave}>
      <CloseIcon className="fill-white" />
      Leave
    </Button>
  ) : (
    <Button {...props} error loading={loading} onClick={handleJoin}>
      <PlusIcon className="fill-white" />
      Join
    </Button>
  );
};
