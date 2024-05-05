"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const DeleteButton = ({ type, id }) => {
    const router = useRouter();

    async function deleteObject() {
        const response = await fetch(`/api/${type}/${id}`, {
            method: "DELETE",
        });
        const status = await response.json();
        alert(status?.message);
        router.refresh();
    }
    return (
        <FontAwesomeIcon
            icon={faX}
            className="text-red-400 hover:cursor-pointer hover:text-red-200"
            onClick={deleteObject}
        />
    );
};

export default DeleteButton;
