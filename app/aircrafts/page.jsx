import React from "react";
import AircraftCard from "../(components)/AircraftCard";
import AddButton from "../(components)/AddButton";

async function fetchInventory() {
    try {
        const response = await fetch(process.env.HOST + "/api/aircraft", {
            cache: "no-store",
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        return response.json();
    } catch (error) {
        console.log("Failed to fetch aircraft inventory.", error);
    }
}

const Aircrafts = async () => {
    const data = await fetchInventory();
    if (!data?.length) {
        return (
            <div className="p-5">
                You don&apos;t have any aircraft registered yet...
                <AddButton type="aircrafts" />
            </div>
        );
    } else {
        data.sort((a, b) => a.status.localeCompare(b.status));
        return (
            <div className="p-5">
                Aircraft Inventory
                <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                    {data.map((aircraft, index) => (
                        <AircraftCard key={index} aircraft={aircraft} />
                    ))}
                </div>
                <AddButton type="aircrafts" />
            </div>
        );
    }
};

export const metadata = {
    title: "Condor - Inventory",
    description: "FBO Management System",
};

export default Aircrafts;
