import  Role  from '@/models/roleModel'; // Ensure you have a Role model defined
import connectDB from '@/utils/DB/db';
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
      const roles = await Role.find(query).skip(skip).limit(limit);
      const total = await Role.countDocuments(query); // Total count for pagination

      // Return users, total count, and pagination info
      return NextResponse.json({
        success: true,
        roles,
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

      const body = await request.json();
      const { roleName, permissions } = body;


      // Create a new role document
      const newRole = new Role({
        name: roleName,
        permission: permissions,  // Use the correct variable
      });



      // Save the new role to the database
      await newRole.save();

      return NextResponse.json({ success: true, data: newRole }, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }
