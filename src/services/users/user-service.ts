import { EditUserFormInputs } from "@/app/users/edit/[id]/page";

  // Fetch user data function
  export const fetchUser = async (id: string) => {
    const response = await fetch(`/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json();
  };

  // Update user data function
  export const updateUser = async ({ id,data }: { id: string; data: EditUserFormInputs }) => {
    const response = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json();
  };

    // Fetch All users function
    export const getAllUsers = async () => {
        const response = await fetch(`/api/users`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      }

    // Delete user by ID function
    export const deleteByID = async (id: string) => {
        const response = await fetch(`/api/users/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error deleting user");
        }
        return id;
      }
