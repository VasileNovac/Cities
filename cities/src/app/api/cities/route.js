import connectDB from "@/libs/mongodb";
import City from "@/models/citySchema" ;
import { NextResponse } from "next/server";

export async function POST(request) {
    const { idx, nume, lat, long, foto, nota, comm } = await request.json();
    await connectDB();
    await City.create({ idx, nume, lat, long, foto, nota, comm}) ;
    return NextResponse.json({message: "Favorit City Created"}, {status: 201});
}

export async function GET() {
    await connectDB();
    const cities = await City.find() ;
    return NextResponse.json({cities});
}

export async function DELETE(request) {
    const idx = request.nextUrl.searchParams.get("idx");
    await connectDB();
    await City.findOneAndDelete({idx: idx});
    return NextResponse.json({message: "Favorit City Deleted"}, {status: 200});
} 

export async function PUT(request) {
    const idx = request.nextUrl.searchParams.get("idx");
    const { newNume: nume, newLat: lat, newLong: long, newFoto: foto, newNota: nota, newComm: comm } = await request.json();
    await connectDB();
    await City.findOneAndUpdate({idx: idx}, { nume, lat, long, foto, nota, comm });
    return NextResponse.json({message: "Favorit City Updated"}, { status: 200});
}
