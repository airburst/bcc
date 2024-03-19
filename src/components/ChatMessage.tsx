/* eslint-disable @next/next/no-img-element */
import { RideNote } from "src/types";

const initials = (name: string): string => {
  if (!name) return "XX";

  const parts = name.split(" ");

  return parts.length > 1
    ? `${parts[0]?.[0]}${parts[1]?.[0]}`.toUpperCase()
    : name.slice(0, 2).toUpperCase();
};

export const ChatMessage: React.FC<RideNote> = ({
  name,
  rideNotes,
  image,
}: RideNote) => (
  <div className="chat chat-start pl-2">
    <div className="chat-image avatar placeholder">
      <div className="bg-neutral text-neutral-content rounded-full w-10">
        {image ? (
          <img alt="Tailwind CSS chat bubble component" src={image} />
        ) : (
          <span className="text-base">{initials(name)}</span>
        )}
      </div>
    </div>
    <div className="chat-header">{name}</div>
    <div className="chat-bubble">{rideNotes}</div>
  </div>
);
