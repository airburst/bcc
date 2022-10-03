import { Dispatch, SetStateAction } from "react";
// import { useGetRiders } from "../../services/PlanetScaleService/hooks"
// import { useLocalStorage } from "../../hooks";
import { JoinButton } from "../../components";
import { Ride, User } from "../../types";
import { Modal } from "./index";
import styles from "./Modal.module.css";

type Props = {
  ride: Ride | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const RideModal: React.FC<Props> = ({ ride, setIsOpen }) => {
  // const [user, setUser] = useLocalStorage<User | null>("bcc-user", null);

  if (!ride) {
    return null;
  }

  const {
    id,
    title,
    rideGroup,
    destination,
    distance,
    leader,
    route,
    // speed,
    riderCount,
    going
  } = ride;

  // const { data, error, loading } = useGetRiders(id!.toString());
  const data: User[] = [];

  // if (error) {
  //   return (
  //     <div className="error-message">
  //       {error}
  //     </div>
  //   )
  // }

  const Content = (
    <>
      <div className={styles.contentRow}>
        <div>{rideGroup} Group</div>
      </div>
      <div className={styles.contentRow}>
        {destination && <div>{destination}</div>}
        {distance && <div>{distance} km</div>}
      </div>
      {route && (
        <div className={styles.contentRow}>
          <div>Route</div>
          <a href={route}>{route}</a>
        </div>
      )}
      {leader && (
        <div className={styles.contentRow}>
          <div>Leader</div>
          <div>{leader}</div>
        </div>
      )}
      <div className={styles.going}>
        <div>Going ({riderCount})</div>
      </div>
      {data?.map(({ name, mobile }) => (
        <div key={name} className={styles.riderRow}>
          <div>{name}</div>
          {mobile && (
            <div className={styles.phone}>
              <i className="fa-solid fa-phone"></i>
              &nbsp;&nbsp;
              <div>{mobile}</div>
            </div>)}
        </div>
      ))}
    </>
  );

  // const handleJoin = () => {
  //   console.log("🚀 ~ RideModal ~ user", user); // FIXME:
  //   if (!user) {
  //     // Prompt user to set name and mobile

  //     // Save to localStorage
  //     setUser({ id: "4", name: "Mark Fairhurst" }) // FIXME:
  //   }
  //   // Add user to ride

  //   // Close modal
  //   setIsOpen(false);
  // }

  const Actions = (
    <>
      <JoinButton going={going} />
      <button
        className={styles.cancelBtn}
        onClick={() => setIsOpen(false)}
      >
        Cancel
      </button>
    </>
  );

  return (
    <Modal heading={title} setIsOpen={setIsOpen} content={Content} actions={Actions} />
  )
}