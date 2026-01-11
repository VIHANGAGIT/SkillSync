import { useMutation } from '@tanstack/react-query';
import { codeAPI } from '../api/code';
import toast from 'react-hot-toast';

export const useExecuteCode = () => {
    return useMutation({
        mutationKey: ["executeCode"],
        mutationFn: codeAPI.executeCode,
        onError: (error) => {
            console.error("Code execution error:", error);
            toast.error(error.response?.data?.message || "Failed to execute code");
        }
    });
};
