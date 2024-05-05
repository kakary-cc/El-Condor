"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const EventForm = () => {
    const router = useRouter();

    const startsRef = useRef(null);
    const endsRef = useRef(null);

    const [highlight, setHighlight] = useState("");

    const startingEventData = {
        user: "",
        equipment: "",
        starts: "",
        ends: "",
        destination: "",
        status: "created",
    };
    const [formData, setFormData] = useState(startingEventData);

    async function handleChange(event) {
        if (startsRef.current.value && endsRef.current.value) {
            if (startsRef.current.value >= endsRef.current.value)
                setHighlight("attention");
            else setHighlight("");
        }

        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (highlight) {
            alert("End time must be greater than start time!");
            return;
        }
        const validation = await fetch(
            `/api/aircraft?tail=${formData.equipment}`
        );
        const equipment = await validation.json();
        if (equipment.status == 404) {
            alert(formData.equipment + " is not a registered aircraft.");
            return;
        }
        const response = await fetch("/api/event", {
            method: "POST",
            body: JSON.stringify({ ...formData, ["equipment"]: equipment._id }),
            "content-type": "application/json",
        });
        if (!response.ok) {
            const error = await response.json();
            alert("Error! " + error.message);
        } else {
            router.refresh();
            router.push("/events");
        }
    }

    // async function getEquipment(event) {
    //     handleChange(event);
    //     const { name, value } = event.target;
    //     try {
    //         const response = await fetch(`/api/aircraft?tail=${value}`);
    //         if (!response.ok) {
    //             throw new Error("Response not OK");
    //         }
    //         const suggestion = await response.json();
    //         setFormData({
    //             ...formData,
    //             ["equipment"]: suggestion._id,
    //         });
    //     } catch (error) {
    //         console.log("Failed to fetch equipment inventory: ", error);
    //     }
    // }

    async function getDestination(event) {
        handleChange(event);
        const { value } = event.target;
        if (value.length !== 4 || value.toUpperCase() !== value) return;
        const response = await fetch(`/api/airport?icao=${value}`);
        if (response.ok) {
            const airport = await response.json();
            const destination =
                airport.name.replace(" Airport", "") +
                ", " +
                airport.region.name;
            setFormData({
                ...formData,
                ["destination"]: destination,
            });
        }
    }

    return (
        <div className="flex justify-center">
            <form
                className="flex flex-col gap-3 w-1/2"
                method="POST"
                onSubmit={handleSubmit}
            >
                <h3>Create New Event</h3>
                <label>Pilot</label>
                <input
                    id="user"
                    name="user"
                    type="text"
                    onChange={handleChange}
                    required={true}
                    value={formData.user}
                />
                <label>Equipment</label>
                <input
                    id="equipment"
                    name="equipment"
                    type="text"
                    onChange={handleChange}
                    required={true}
                    value={formData.equipment}
                />
                <label>Destination</label>
                <input
                    id="destination"
                    name="destination"
                    type="text"
                    onChange={getDestination}
                    required={true}
                    value={formData.destination}
                />
                <label>Starts</label>
                <input
                    id="starts"
                    name="starts"
                    type="datetime-local"
                    onChange={handleChange}
                    ref={startsRef}
                    className={highlight}
                    required={true}
                    value={formData.starts}
                />
                <label>Ends</label>
                <input
                    id="ends"
                    name="ends"
                    type="datetime-local"
                    onChange={handleChange}
                    ref={endsRef}
                    className={highlight}
                    required={true}
                    value={formData.ends}
                />
                <input type="submit" className="btn" value="Create Event" />
            </form>
        </div>
    );
};

export default EventForm;
