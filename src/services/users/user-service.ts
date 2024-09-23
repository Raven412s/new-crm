import { EditUserFormInputs } from "@/types/users/user-type";


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
    export const getAllUsers = async ({
        page,
        pageSize,
        search,
        role,
      }: {
        page: number;
        pageSize: number;
        search: string;
        role: string;
      }) => {
        // Build query parameters for pagination, search, and filtering
        const queryParams = new URLSearchParams();

        if (page) queryParams.append("page", String(page));
        if (pageSize) queryParams.append("pageSize", String(pageSize));
        if (search) queryParams.append("search", search);
        if (role) queryParams.append("role", role);

        const response = await fetch(`/api/users?${queryParams.toString()}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        return response.json();
      };


      
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


      export const deleteByToolbar = async (ids: string | string[]) => {
        const response = await fetch("/api/users", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: Array.isArray(ids) ? ids : [ids] }), // Send as an array, even if it's a single id
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error deleting user(s)");
        }

        return ids; // Return the ids (or array of ids) that were deleted
      };
