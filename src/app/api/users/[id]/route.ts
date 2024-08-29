import { User } from '@/models/userModel';
import connectDB from '@/utils/DB/db';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

// GET user by ID
export async function GET(request: NextRequest, context : any) {
  try {
    await connectDB();

    const id = context.params.id

    const user = await User.findById(id);
    console.log(`api/user/route.ts -> user : ${user}`);

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PATCH (Update) user by ID
export async function PATCH(request: NextRequest,context : any) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = context.params.id

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });
    }

    const { name, email, role, mobile } = await request.json();

    const updatedUser = await User.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { name, email, role, mobile } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
  } catch (error: any) {
    console.error(`Error updating user: ${error.message}`);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE user by ID
export async function DELETE(request: NextRequest, context : any) {
  try {
    await connectDB();
    const id = context.params.id

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });
    }

    const deletedUser = await User.findByIdAndDelete(new ObjectId(id));

    if (!deletedUser) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'User deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error(`Error deleting user: ${error.message}`);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
