// app/api/users/route.ts
import { User } from '@/models/userModel';
import connectDB from '@/utils/DB/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await connectDB();

    const { name, email, mobile, password, role } = await request.json();

    const user = await User.create({ name, email, mobile, password, role });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
export async function PATCH(request: Request) {
  try {
    await connectDB();

    const { name, email, mobile, role } = await request.json();

    const user = await User.updateOne({ name, email, mobile, role });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const users = await User.find({});

    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
