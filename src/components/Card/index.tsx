import { useLongPress } from 'use-long-press';
import { isMobile } from "../../utils";
import { JoinButton } from "../../components";
import { Ride } from "../../types";
import styles from "./Card.module.css";

type Props = {
  ride: Ride;
  onPress: (ride: Ride) => void;
}

/**
 * All ride instances share common date and type
 */
export const Card: React.FC<Props> = ({ ride, onPress }) => {
  const { title, rideGroup, riderCount, destination, distance, going } = ride;
  const details = destination ? `${destination} - ${distance} km` : `${distance} km`;

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
        <div className={styles.title}>{title} ({rideGroup})</div>
        <div>{details}</div>
      </div>
      <div className={styles.riders}>
        <i className="fa-solid fa-person-biking"></i>
        <span className={styles.count}>{riderCount}</span>
      </div>
      <div className={styles.alignRight}>
        <JoinButton going={going} />
      </div>
    </div>
  );
};
