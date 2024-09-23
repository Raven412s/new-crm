import roleModel from '@/models/roleModel';

import connectDB from '@/utils/DB/db';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';


// DELETE user by ID
export async function DELETE(request: NextRequest, context : any) {
    try {
      await connectDB();
      const id = context.params.id

      if (!id) {
        return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });
      }

      const deletedUser = await roleModel.findByIdAndDelete(new ObjectId(id));

      if (!deletedUser) {
        return NextResponse.json({ success: false, message: 'role not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: 'role deleted successfully' }, { status: 200 });
    } catch (error: any) {
      console.error(`Error deleting role: ${error.message}`);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }
