import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faHashtag } from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "./DeleteButton";
import StatusDisplay from "./StatusDisplay";

const AircraftCard = ({ aircraft }) => {
    const statuses = {
        available: "green",
        grounded: "red",
    };
    return (
        <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2">
            <div className="flex mb-3">
                <div className="ml-auto">
                    <DeleteButton type={"aircraft"} id={aircraft._id} />
                </div>
            </div>
            <h4 className="whitespace-pre-wrap">
                <FontAwesomeIcon icon={faHashtag} />
                {` ` + aircraft.tail}
            </h4>
            <hr className="h-px border-0 bg-page mb-2" />
            <p className="whitespace-pre-wrap">
                {aircraft.type}
                <br />
                <FontAwesomeIcon icon={faDollarSign} />
                {` ` + aircraft.rate} / hour
            </p>
            <div className="flex-grow"></div>
            <div className="flex mt-2">
                <div className="ml-auto flex items-end">
                    <StatusDisplay
                        status={aircraft.status}
                        color={statuses[aircraft.status]}
                    />
                </div>
            </div>
        </div>
    );
};

export default AircraftCard;
