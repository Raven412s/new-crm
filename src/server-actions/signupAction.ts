"use server";
import { User } from "@/models/userModel"
import connectDB from "@/utils/DB/db"
import { hash } from "bcryptjs"
import { redirect } from "next/navigation"

export const signupFunction =async(formData:FormData)=>{
    const name = formData.get("name") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const mobile = formData.get("mobile") as string | undefined;
    const password = formData.get("password") as string | undefined;
    const matchPassword = formData.get("matchPassword") as string | undefined;

    if (!name || !email || !mobile || !password || !matchPassword) {
        throw new Error("Please provide all the fields")
    }

    if (password!==matchPassword) {
        throw new Error("passwords' mismatch, the passwords should be the same.")
    }

    await connectDB()

    // check in database for existing email with any user
    const user = await User.findOne({email})
    if (user) {
        throw new Error("Email already exists")
    }


    // Hash the password before saving to database
    const hashedPassword = await hash(password, 10)


    // create a new user
   await User.create({
        name,
        email,
        mobile,
        password: hashedPassword
    })
  redirect("/login")
}
