import { User } from '@/models/userModel';
import connectDB from '@/utils/DB/db';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
      await connectDB();

      // Create a URL object to access the search parameters
      const url = new URL(request.url);
      const search = url.searchParams.get('search') || ""; // Default to empty string if not present
      const role = url.searchParams.get('role') || ""; // Default to empty string if not present
      const page = url.searchParams.get('page') || "1"; // Default to "1" if not present
      const pageSize = url.searchParams.get('pageSize') || "10"; // Default to "10" if not present

      // Convert pagination query parameters
      const pageNum = parseInt(page, 10) || 1;
      const limit = parseInt(pageSize, 10) || 10;
      const skip = (pageNum - 1) * limit;

      // Build query object for searching and filtering
      const query: any = {};

      // If there is a search term, filter by name or email
      if (search) {
        query["$or"] = [
          { name: { $regex: search, $options: "i" } }, // Case-insensitive search for name
          { email: { $regex: search, $options: "i" } } // Case-insensitive search for email
        ];
      }

      // If a role is provided, filter by role
      if (role) {
        query["role"] = role;
      }

      // Execute the query with pagination
      const users = await User.find(query).skip(skip).limit(limit);
      const total = await User.countDocuments(query); // Total count for pagination

      // Return users, total count, and pagination info
      return NextResponse.json({
        success: true,
        users,
        total,
        pageNum,
        pageSize: limit
      });

    } catch (error: any) {
      // Handle any errors and return a 500 status
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }



export async function POST(request: Request) {
  try {
    await connectDB();

    const { name, email, mobile, password, role, address, city, state, country } = await request.json();

    const user = await User.create({ name, email, mobile, password, role, address, city, state, country });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
    try {
      await connectDB();
      const { ids } = await request.json(); // Fetching `ids` from the request body

      if (!ids || ids.length === 0) {
        return NextResponse.json({ success: false, message: 'ID or IDs are required' }, { status: 400 });
      }

      // Handle single or multiple IDs
      if (Array.isArray(ids)) {
        // If it's an array, delete multiple users
        const objectIds = ids.map((id) => new ObjectId(id));
        const result = await User.deleteMany({ _id: { $in: objectIds } });

        if (result.deletedCount === 0) {
          return NextResponse.json({ success: false, message: 'No users found to delete' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: `${result.deletedCount} users deleted successfully` }, { status: 200 });
      } else {
        // If it's a single id, delete one user
        const deletedUser = await User.findByIdAndDelete(new ObjectId(ids));

        if (!deletedUser) {
          return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'User deleted successfully' }, { status: 200 });
      }
    } catch (error: any) {
      console.error(`Error deleting user(s): ${error.message}`);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }
