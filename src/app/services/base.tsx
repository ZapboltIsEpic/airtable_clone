
import { api } from "~/trpc/react";

export const useGetAllBasesByUserIdQuery = (userId?: string) => {
    const { data, isLoading, error } = api.base.get.useQuery(
        { userId: userId! },
        { enabled: !!userId}, 
    );

    return { data, isLoading, error };
};

export const useCreateBaseMutation = () => {
    const ctx = api.useUtils();

    return api.base.create.useMutation({
        onSuccess: async () => {
            console.log("Base created successfully");
            await ctx.base.get.invalidate();
        },
        onError: (error) => {
            console.error("Error creating base:", error);
        },
    });
};