import { useQuery } from "@tanstack/react-query";
import {getCurrentUser} from "../../services/auth";

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
    });
}