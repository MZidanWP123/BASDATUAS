import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

// POST: Menambah role baru
export async function POST(req) {
  const searchParams = req.nextUrl.searchParams;
  const nama = searchParams.get("nama");
  const role_id = searchParams.get("role_id");

  try {
    const newRole = await db.role.create({
      data: {
        role_id: role_id,
        name: nama,
      },
    });
    return NextResponse.json(newRole);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET: Mendapatkan semua role
export async function GET(req) {
  try {
    const roles = await db.role.findMany();
    return NextResponse.json(roles);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Menghapus role berdasarkan role_id
export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams;
  const role_id = searchParams.get("role_id");

  try {
    await db.role.delete({
      where: { role_id: role_id },
    });
    return NextResponse.json({ message: "Role deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH: Memperbarui nama role berdasarkan role_id
export async function PATCH(req) {
  const searchParams = req.nextUrl.searchParams;
  const nama = searchParams.get("nama");
  const role_id = searchParams.get("role_id");

  try {
    const updatedRole = await db.role.update({
      where: { role_id: role_id },
      data: { name: nama },
    });
    return NextResponse.json(updatedRole);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
