import { useLongPress } from 'use-long-press';
import { isMobile } from "../../../shared/utils";
import { JoinButton } from "../../components";
import { Ride, User } from "../../types";
import styles from "./Card.module.css";

type Props = {
  ride: Ride;
  user?: User;
  onPress: (ride: Ride) => void;
}

export const Card: React.FC<Props> = ({ ride, user, onPress }) => {
  const { id, name, group, destination, distance, users } = ride;
  const details = destination ? `${destination} - ${distance} km` : `${distance} km`;

  const isGoing = user ? users?.map(u => u.id).includes(user.id) : false;
  const riderCount = users?.length;

  const pressHandler = useLongPress(() => onPress(ride), {
    threshold: isMobile() ? 400 : 0,
    cancelOnMovement: true,
    filterEvents: event => {
      const target = event.target as Element;
      return target.tagName.toLowerCase() === "div"
    }
  });

  return (
    <div className={styles.container} {...pressHandler()}>
      <div className={styles.col}>
        <div className={styles.title}>{name} ({group})</div>
        <div>{details}</div>
      </div>
      <div className={styles.riders}>
        <i className="fa-solid fa-person-biking"></i>
        <span className={styles.count}>{riderCount}</span>
      </div>
      <div className={styles.alignRight}>
        {user && (
          <JoinButton
            going={isGoing}
            ariaLabel={`Join ${name} ride`}
            rideId={id}
            userId={user.id}
          />)
        }
      </div>
    </div>
  );
};
