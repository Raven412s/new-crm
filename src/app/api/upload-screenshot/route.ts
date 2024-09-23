import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/userModel';
import connectDB from '@/utils/DB/db';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get('file');
    const userId = data.get('userId');
    const deviceSpecs = data.get('deviceSpecs');

    if (!file || !(file instanceof Blob) || !userId || !deviceSpecs) {
      return NextResponse.json({ error: 'File, userId, or device specs are missing or invalid' }, { status: 400 });
    }

    // Upload to Cloudinary
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      uploadStream.end(buffer);
    });

    // Save the screenshot URL and other details in MongoDB
    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

 

    await user.save();

    return NextResponse.json({ message: 'Screenshot uploaded and saved successfully' });
  } catch (error) {
    console.error('Error saving screenshot:', error);
    return NextResponse.json({ error: 'Failed to save screenshot' }, { status: 500 });
  }
}
