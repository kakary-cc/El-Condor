import { NextResponse } from "next/server";

export async function GET(request) {
    const icao = request.nextUrl.searchParams.get("icao");
    if (!icao) {
        return NextResponse.json({ message: "Bad request." }, { status: 400 });
    }
    const response = await fetch(
        `https://airportdb.io/api/v1/airport/${icao}?apiToken=${process.env.AIRPORTDB_API_TOKEN}`
    );
    if (!response.ok) {
        return NextResponse.json(
            { message: response.statusText },
            { status: response.status }
        );
    }
    const airport = await response.json();
    return NextResponse.json(airport, { status: 200 });
}
