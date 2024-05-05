import { Equipment } from "@/app/api/db";
import { NextResponse } from "next/server";
import sanitize from "mongo-sanitize";

export async function DELETE(request, { params }) {
    try {
        await Equipment.deleteOne({
            _id: sanitize(params.id),
        });
        return NextResponse.json(
            { message: "Aircraft deleted" },
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
