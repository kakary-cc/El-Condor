import EventForm from "@/app/(components)/EventForm";
import React from "react";

const Event = () => {
    return (
        <div>
            <EventForm />
        </div>
    );
};

export const metadata = {
    title: "Condor - New Event",
    description: "FBO Management System",
};

export default Event;
