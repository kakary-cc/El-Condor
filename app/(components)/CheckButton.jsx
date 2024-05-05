"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const CheckButton = ({ type, id }) => {
    const router = useRouter();

    async function checkIn() {
        const response = await fetch(`/api/${type}/${id}`, {
            method: "PUT",
        });
        const status = await response.json();
        alert(status?.message);
        router.refresh();
    }
    return (
        <FontAwesomeIcon
            icon={faCheck}
            className="text-green-400 hover:cursor-pointer hover:text-red-200"
            onClick={checkIn}
        />
    );
};

export default CheckButton;
