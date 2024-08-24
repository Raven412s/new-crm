import { compare } from "bcryptjs";
import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialProvider from 'next-auth/providers/credentials';
import { User } from "./models/userModel";
import connectDB from "./utils/DB/db";
import { toast } from "sonner";



export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialProvider({
        name: `Credentials`,
        credentials:{
            email:{
                name:"email",
                type:"email",
                label:"Email",
                placeholder:"example.login@example.com"
            },
            password:{
                name:"password",
                type:"password",
                label:"Password",
                placeholder:"********",
            }
        },
        authorize: async (credentials)=>{
            const email = credentials.email as string;
            const password = credentials.password as string;

            if( !email || !password){
                throw new CredentialsSignin({cause:"Please provide both credentials"});
            }

            await connectDB();

            console.log(`email : ${email},password : ${password}`)
            const user = await User.findOne({email}).select("+password")

            if(!user){
                throw new CredentialsSignin({cause:"User not found"})
            }


            if(!user.password){
                throw new CredentialsSignin({cause:"Password is incorrect"})
            }

            const isMatch = await compare(password,user.password)

            if(!isMatch){
                throw new CredentialsSignin({cause:"Email or Password is incorrect"})
            }

            return {
              name:user.name,
              email:user.email,
              mobile:user.mobile,
              role:user.role
            };

        }
    })
  ],
  pages:{
    signIn: "/login"
  }
})
