import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(
        { message: "This is a test error message." },
        { status: 500 }
    );
}

export async function POST() {
    return NextResponse.json(
        { message: "This is a test error message." },
        { status: 500 }
    );
}

export async function DELETE() {
    return NextResponse.json(
        { message: "This is a test error message." },
        { status: 500 }
    );
}
