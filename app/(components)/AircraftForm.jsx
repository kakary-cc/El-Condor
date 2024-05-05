"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AircraftForm = () => {
    const router = useRouter();

    const startingData = {
        tail: "",
        type: "",
        rate: "",
        status: "available",
    };
    const [formData, setFormData] = useState(startingData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("/api/aircraft", {
            method: "POST",
            body: JSON.stringify(formData),
            "content-type": "application/json",
        });
        if (!response.ok) {
            const error = await response.json();
            alert("Error! " + error.message);
        } else {
            router.refresh();
            router.push("/aircrafts");
        }
    };

    return (
        <div className="flex justify-center">
            <form
                className="flex flex-col gap-3 w-1/2"
                method="POST"
                onSubmit={handleSubmit}
            >
                <h3>Add Aircraft</h3>
                <label>Tail Number</label>
                <input
                    id="tail"
                    name="tail"
                    type="text"
                    onChange={handleChange}
                    required={true}
                    minLength="2"
                    maxLength="8"
                    value={formData.tail}
                />
                <label>Aircraft Type</label>
                <input
                    id="type"
                    name="type"
                    type="text"
                    onChange={handleChange}
                    required={true}
                    value={formData.type}
                />
                <label>Rental Rate</label>
                <input
                    id="rate"
                    name="rate"
                    type="number"
                    onChange={handleChange}
                    required={true}
                    value={formData.rate}
                />
                <input type="submit" className="btn" value="Add Aircraft" />
            </form>
        </div>
    );
};

export default AircraftForm;
