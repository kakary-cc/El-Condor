import React from "react";

function capitalizeFirst(str) {
    return str
        .split("_")
        .map((str) => (str = str.charAt(0).toUpperCase() + str.slice(1)))
        .join(" ");
}

const StatusDisplay = ({ status, color }) => {
    function getColor(color) {
        switch (color) {
            case "green":
                return "bg-green-200 text-gray-700";
            case "yellow":
                return "bg-yellow-200 text-gray-700";
            case "red":
                return "bg-red-200 text-gray-700";
            case "blue":
                return "bg-blue-200 text-gray-700";
            case "slate":
                return "bg-slate-700 text-white";
            case "gray":
            default:
                return "bg-slate-300 text-black";
        }
    }

    return (
        <span
            className={`inline-block  rounded-full px-2 py-1 text-xs font-semibold ${getColor(
                color
            )}`}
        >
            {capitalizeFirst(status)}
        </span>
    );
};

export default StatusDisplay;
