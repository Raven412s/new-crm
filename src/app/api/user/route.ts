import { auth } from '@/auth';
import { User } from '@/models/userModel';
import connectDB from '@/utils/DB/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const session = await auth()
  try {
    await connectDB();
    const userdata = session?.user
    const email = userdata?.email
    console.log("session",session)
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ _id: user._id, username: user.name });
  } catch (error:any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
