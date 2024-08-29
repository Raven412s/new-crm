import { Role } from '@/models/roleModel'; // Ensure you have a Role model defined
import connectDB from '@/utils/DB/db';
import { NextResponse } from 'next/server';

// GET route to fetch all roles
export async function GET() {
  try {
    await connectDB();

    const roles = await Role.find(); // Adjust based on your model
    return NextResponse.json(roles, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST route to create a new role
export async function POST(request: Request) {
  try {
    await connectDB();

    const { name, permissions } = await request.json();

    const role = await Role.create({ name, permissions });

    return NextResponse.json({ success: true, role }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


export async function PUT(request: Request) {
  try {
    await connectDB();

    const { id, permissions } = await request.json();

    const role = await Role.findByIdAndUpdate(id, { permissions }, { new: true });

    if (!role) {
      return NextResponse.json({ success: false, message: 'Role not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, role }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
