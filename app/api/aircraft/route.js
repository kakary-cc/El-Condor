import { Equipment } from "@/app/api/db";
import { NextResponse } from "next/server";
import sanitize from "mongo-sanitize";

export async function POST(request) {
    try {
        const body = await request.json();
        await Equipment.create(sanitize(body));
        return NextResponse.json(
            { message: "Aircraft created." },
            { status: 201 }
        );
    } catch (error) {
        console.log(error.message);
        if (error.code === 11000) {
            return NextResponse.json(
                { message: "Tail number already exists." },
                { status: 409 }
            );
        }
        return NextResponse.json(
            { message: "An error has occured when attempting insertion." },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    const tail = request.nextUrl.searchParams.get("tail");
    try {
        if (tail) {
            const aircraft = await Equipment.findOne({ tail: sanitize(tail) });
            return NextResponse.json(
                aircraft
                    ? aircraft
                    : ({ message: "Not found." }, { status: 404 })
            );
        }
        const aircrafts = await Equipment.find();
        return NextResponse.json(aircrafts, { status: 200 });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(
            { message: "An error has occured when attempting retrieval." },
            { status: 500 }
        );
    }
}
