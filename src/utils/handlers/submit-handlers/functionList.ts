
import { AddUserFormInputs, EditUserFormInputs } from "@/types/users/user-type";
import { headers } from "@/utils/headers/headers";
import { hash } from "bcryptjs";
import { toast } from "sonner";


export const onAddUserFormSubmit = async (router :any ,data: AddUserFormInputs ) => {
    console.log("data from client--------------->", data)
    try {
        const hashedPassword = hash(data.password,10)
      const formattedData = {
        ...data,
        password: (await hashedPassword).toString()
      }
      const response = await fetch("/api/users", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {

        toast.success("User added successfully!");
        // router.push("/users")

        console.log("response--------------->", response.body)

      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };




export const  onEditUserFormSubmit =({mutation,data}:{mutation:object,data: EditUserFormInputs})=> {
    mutation.mutate(data);
  };
