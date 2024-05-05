import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddButton = ({ type }) => {
    return (
        <a href={`/${type}/new`}>
            <button className="add">
                <FontAwesomeIcon icon={faPlus} className="icon" />
            </button>
        </a>
    );
};

export default AddButton;
