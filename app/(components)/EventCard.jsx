import dayjs from "dayjs";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "./DeleteButton";
import StatusDisplay from "./StatusDisplay";
import CheckButton from "./CheckButton";

const EventCard = ({ event }) => {
    const statuses = {
        in_progress: "blue",
        "pending_check-in": "yellow",
        upcoming: "green",
        finished: "slate",
        cancelled: "gray",
        no_show: "red",
    };
    return (
        <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2">
            <div className="flex mb-3">
                <div className="ml-auto space-x-3">
                    {event.status === "pending_check-in" && (
                        <CheckButton type={"event"} id={event._id} />
                    )}
                    <DeleteButton type={"event"} id={event._id} />
                </div>
            </div>
            <h4 className="whitespace-pre-wrap">
                <FontAwesomeIcon icon={faFlagCheckered} />
                {` `}Flight to {event.destination}
            </h4>
            <hr className="h-px border-0 bg-page mb-2" />
            <p className="whitespace-pre-wrap">
                Pilot: {event.user}
                <br />
                Equipment: {event.equipment?.tail ?? "N/A"}
                <br />
                Starts at: {dayjs(event.starts).format("YYYY-MM-DD HH:mm")}
                <br />
                Ends at: {dayjs(event.ends).format("YYYY-MM-DD HH:mm")}
            </p>
            <div className="flex-grow"></div>
            <div className="flex mt-2">
                <div className="ml-auto flex items-end">
                    <StatusDisplay
                        status={event.status}
                        color={statuses[event.status]}
                    />
                </div>
            </div>
        </div>
    );
};

export default EventCard;
