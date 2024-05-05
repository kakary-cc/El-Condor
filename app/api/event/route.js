import { Event } from "@/app/api/db";
import { NextResponse } from "next/server";
import sanitize from "mongo-sanitize";

export async function POST(request) {
    try {
        const body = await request.json();
        await Event.create(sanitize(body));
        return NextResponse.json(
            { message: "Event created." },
            { status: 201 }
        );
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(
            { message: "An error has occured when attempting insertion." },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const events = await Event.find().populate("equipment");
        return NextResponse.json(events, { status: 200 });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(
            { message: "An error has occured when attempting retrieval." },
            { status: 500 }
        );
    }
}
