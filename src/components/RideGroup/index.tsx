import React from "react";
import { Card } from "../../components";
import { ungroupRides } from "../../../shared/utils"
import { Group, Ride, User } from "../../types"
import styles from "./RideGroup.module.css";

type Props = {
  group: Group;
  user?: User;
  onPress: (ride: Ride) => void;
}

export const RideGroup: React.FC<Props> = ({ group, user, onPress }) => {
  const rideData = ungroupRides(group);
  const date = rideData.map(({ date }) => date)[0];
  const types = rideData.map(({ rides }) => ({ rides }));

  return (
    <>
      <div className={styles.container}>
        <div>{date}</div>
      </div>
      {types.map(({ rides }) => rides.map(ride => (
        <Card key={ride.id} ride={ride} user={user} onPress={onPress} />
      )))}
    </>
  );
};
