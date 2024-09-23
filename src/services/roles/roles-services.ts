       // Fetch All users function
       export const getAllRoles = async ({
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

        const response = await fetch(`/api/roles?${queryParams.toString()}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        return response.json();
      };

    // Fetch All users function
    export const getRoles = async () => {
        const response = await fetch(`/api/roles/get-one`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        return response.json();
      };

    // Delete user by ID function
    export const deleteByID = async (id: string) => {
        const response = await fetch(`/api/roles/${id}`, {
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
