import { makeClickableUrl } from "@utils/makeClickableUrl";

type RideNote = {
  name: string;
  rideNotes: string | undefined;
};

type Props = {
  riderNotes?: RideNote[];
};

export const Messages = ({ riderNotes = [] }: Props) => {
  if (riderNotes.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full flex-col rounded bg-white py-2 shadow-md ">
      <div className="px-2 pb-2 text-xl font-bold tracking-wide text-neutral-700">
        Messages
      </div>
      {riderNotes?.map(({ name, rideNotes }, i) => (
        <div key={name || i} className="flex items-start py-1 px-2">
          <div className="flex flex-col w-full leading-1.5 p-2 px-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-neutral-700">
                {name}
              </span>
            </div>
            <p
              className="text-sm font-normal text-neutral-700"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: makeClickableUrl(rideNotes || ""),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
