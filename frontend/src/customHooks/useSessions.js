import {useQuery, useMutation} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { sessionAPI } from '../api/sessions';


export const useActiveSessions = () => {
    const response = useQuery({
        queryKey: ["activeSessions"],
        queryFn: sessionAPI.getActiveSessions,
    });

    return response;
}

export const useCreateSession = () => {
    const response = useMutation({
        mutationKey: ["createSession"],
        mutationFn: sessionAPI.createSession,
        onSuccess: () => {
            console.log("Create Session Success");
            toast.success("Session created successfully!", { duration: 3000 });
        },
        onError: (error) => {
            toast.error("Failed to create session: " + error.message, { duration: 3000 });
            console.error("Create Session Error:", error);
        }
    });

    return response;
}

export const usePastSessions = () => {
    const response = useQuery({
        queryKey: ["pastSessions"],
        queryFn: sessionAPI.getPastSessions,
    });

    return response;
}

export const useSessionById = (sessionId) => {
    const response = useQuery({
        queryKey: ["session", sessionId],
        queryFn: () => sessionAPI.getSessionById(sessionId),
        enabled: !!sessionId, // only run if sessionId is available
        refetchInterval: 5000, // refetch every 5 seconds
    });

    return response;
}

export const useJoinSession = () => {
    const response = useMutation({
        mutationKey: ["joinSession"],
        mutationFn: sessionAPI.joinSession,
        onSuccess: () => {
            toast.success("Joined session successfully!");
        },
        onError: (error) => {
            toast.error("Failed to join session: " + error.message);
        }
    });

    return response;
}

export const useEndSession = () => {
    const response = useMutation({
        mutationKey: ["endSession"],
        mutationFn: sessionAPI.endSession,
        onSuccess: () => {
            toast.success("Session ended successfully!", { duration: 3000 });
        },
        onError: (error) => {
            toast.error("Failed to end session: " + error.message);
        }
    });

    return response;
}