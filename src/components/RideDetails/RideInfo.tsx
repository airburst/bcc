import { Ride, User } from "../../types";

type RowProps = {
  children: JSX.Element | JSX.Element[] | null | undefined;
};

const Row = ({ children }: RowProps) => (
  <div className="grid w-full grid-cols-[100px_1fr] items-center justify-between px-2 font-medium md:grid-cols-[220px_1fr] md:justify-start md:gap-4">
    {children}
  </div>
);

type Props = {
  ride: Ride;
};

export const RideInfo = ({ ride }: Props) => {
  const {
    name,
    group,
    time,
    meetPoint,
    destination,
    distance,
    leader,
    route,
    speed,
    notes,
    users,
  } = ride;

  const riderNotes = users
    ?.filter((u: User) => u.rideNotes)
    .map(({ name: riderName, rideNotes }) => ({ name: riderName, rideNotes }));

  return (
    <div className="flex w-full flex-col gap-2 px-2 sm:px-0">
      <div className="flex w-full flex-col gap-2 rounded bg-white py-2 shadow-md">
        <Row>
          <div className="text-xl font-bold tracking-wide text-neutral-700">
            {time}
          </div>
          <div className="text-xl font-bold tracking-wide text-neutral-700">
            {name}
          </div>
        </Row>
        {group && (
          <Row>
            <div>Group</div>
            <div>{group}</div>
          </Row>
        )}
        {meetPoint && (
          <Row>
            <div>Meet at</div>
            <div>{meetPoint}</div>
          </Row>
        )}
        {destination && (
          <Row>
            <div>Destination</div>
            <div>{destination}</div>
          </Row>
        )}
        {distance && (
          <Row>
            <div>Distance</div>
            <div>{distance}</div>
          </Row>
        )}
        {speed && (
          <Row>
            <div>Average Speed</div>
            <div>{speed}/h (est)</div>
          </Row>
        )}
        {leader && (
          <Row>
            <div>Leader</div>
            <div>{leader}</div>
          </Row>
        )}
        {route && (
          <Row>
            <a
              className="col-span-2 text-blue-700 underline hover:text-blue-800"
              href={route}
              target="_blank"
              rel="noreferrer"
            >
              Click to see route
            </a>
          </Row>
        )}
      </div>

      {notes && (
        <div className="flex w-full flex-col gap-2 rounded bg-white py-2 shadow-md">
          <div className="px-2 text-xl font-bold tracking-wide text-neutral-700">
            Notes
          </div>
          <Row>
            <div className="col-span-2 whitespace-pre-line">{notes}</div>
          </Row>
        </div>
      )}

      {(riderNotes || []).length > 0 && (
        <div className="flex w-full flex-col gap-2 rounded bg-white py-2 shadow-md">
          <div className="px-2 text-xl font-bold tracking-wide text-neutral-700">
            Rider Notes
          </div>
          {riderNotes?.map((rider) => (
            <Row key={rider.name}>
              <div className="whitespace-pre-line">{rider.name}</div>
              <div className="whitespace-pre-line">{rider.rideNotes}</div>
            </Row>
          ))}
        </div>
      )}
    </div>
  );
};
