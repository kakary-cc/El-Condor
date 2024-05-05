import { Event } from "@/app/api/db";
import { NextResponse } from "next/server";
import sanitize from "mongo-sanitize";

export async function DELETE(request, { params }) {
    try {
        await Event.deleteOne({ _id: sanitize(params.id) });
        return NextResponse.json(
            { message: "Event deleted." },
            { status: 200 }
        );
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(
            { message: "An error has occured when attempting deletion." },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const event = await Event.findOne({ _id: sanitize(params.id) });
        if (event.status === "created") event.status = "checked-in";
        await event.save();
        return NextResponse.json(
            { message: "Successfully checked-in." },
            { status: 200 }
        );
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(
            { message: "An error has occured when attempting check in." },
            { status: 500 }
        );
    }
}
