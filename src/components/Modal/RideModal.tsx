import { Dispatch, SetStateAction } from "react";
// import { useGetRiders } from "../../services/PlanetScaleService/hooks"
// import { useLocalStorage } from "../../hooks";
import { JoinButton } from "../../components";
import { Ride, User } from "../../types";
import { Modal } from "./index";
import styles from "./Modal.module.css";

type Props = {
  ride: Ride | null;
  user?: User;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const RideModal: React.FC<Props> = ({ ride, user, setIsOpen }) => {
  if (!ride) {
    return null;
  }

  const {
    id,
    name,
    group,
    destination,
    distance,
    leader,
    route,
    // speed,
    users
  } = ride;

  const isGoing = user ? users?.map(u => u.id).includes(user.id) : false;

  const Content = (
    <>
      <div className={styles.contentRow}>
        <div>{group} Group</div>
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
        <div>Going ({users?.length})</div>
      </div>
      {users?.map(({ name, mobile }) => (
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

  const Actions = (
    <>
      {user && (
        <JoinButton
          going={isGoing}
          ariaLabel={`Join ${name} ride`}
          rideId={id}
          userId={user.id}
        />)
      }
      <button
        className={styles.cancelBtn}
        onClick={() => setIsOpen(false)}
      >
        Cancel
      </button>
    </>
  );

  return (
    <Modal heading={name} setIsOpen={setIsOpen} content={Content} actions={Actions} />
  )
}