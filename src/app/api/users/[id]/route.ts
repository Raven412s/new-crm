import roleModel from '@/models/roleModel';
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
    // console.log(`api/user/route.ts -> user : ${user}`);
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PATCH (Update) user by ID
export async function PATCH(request: NextRequest, context: any) {
    try {
        await connectDB();

        const id = context.params.id;

        if (!id) {
            return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });
        }

        const { name, email, role, mobile } = await request.json();

        // Log the role to check what's being received
        console.log(`Received role: ${role}`);

        // Find the role document to get permissions
        const roleDoc = await roleModel.findOne({ name: role });
        if (!roleDoc) {
            console.log(`Role not found in database: ${role}`);
            return NextResponse.json({ success: false, message: 'Role not found' }, { status: 404 });
        }

        console.log(`Role found: ${roleDoc.name} with permissions: ${roleDoc.permission}`);

        // Convert roleDoc.permission (array) to an object
        const permissions = roleDoc.permission.reduce((acc: { [key: string]: string }, perm: string) => {
            acc[perm] = perm;
            return acc;
        }, {});

        // Update the user document with new details and permissions
        const updatedUser = await User.findOneAndUpdate(
            { _id: new ObjectId(id) },
            {
                $set: {
                    name,
                    email,
                    role,
                    mobile,
                    permissions: permissions // Store as object
                }
            },
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
