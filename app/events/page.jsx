import dayjs from "dayjs";
import React from "react";
import EventCard from "../(components)/EventCard";
import AddButton from "../(components)/AddButton";

async function fetchList() {
    try {
        const response = await fetch(process.env.HOST + "/api/event", {
            cache: "no-store",
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        return response.json();
    } catch (error) {
        console.log("Failed to fetch event list.", error);
    }
}

const Events = async () => {
    const data = await fetchList();
    if (!data?.length) {
        return (
            <div className="p-5">
                You don&apos;t have any upcoming event yet...
                <AddButton type="events" />
            </div>
        );
    } else {
        const now = dayjs();
        data.sort((a, b) => dayjs(b.starts).diff(a.starts));
        data.forEach((event) => {
            if (event.status !== "cancelled") {
                if (now.isAfter(dayjs(event.ends)))
                    event.status =
                        event.status === "checked-in" ? "finished" : "no_show";
                else if (now.isAfter(dayjs(event.starts)))
                    event.status =
                        event.status === "checked-in"
                            ? "in_progress"
                            : "pending_check-in";
                else event.status = "upcoming";
            }
        });
        const categories = {
            "In Progress": ["in_progress", "pending_check-in"],
            "Upcoming Events": ["upcoming"],
            "Inactive Events": ["finished", "cancelled", "no_show"],
        };
        return (
            <>
                {Object.keys(categories).map((category, index) => (
                    <div className="p-5" key={index}>
                        <p className="text-lg justify-center mx-auto">
                            {category}
                        </p>
                        <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                            {data.map(
                                (event) =>
                                    categories[category].includes(
                                        event.status
                                    ) && (
                                        <EventCard
                                            key={event._id}
                                            event={event}
                                        />
                                    )
                            )}
                        </div>
                    </div>
                ))}
                <AddButton type="events" />
            </>
        );
    }
};

export const metadata = {
    title: "Condor - Events",
    description: "FBO Management System",
};

export default Events;
