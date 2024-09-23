import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteByID } from "../user-service";
import { toast } from "sonner";
const queryClient = useQueryClient();
 // Handle user deletion

