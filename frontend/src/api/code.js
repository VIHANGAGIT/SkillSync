import axiosInstance from '../lib/axios.js';

export const codeAPI = {
    executeCode: async (data) => {
        const response = await axiosInstance.post('/code/execute', data);
        return response.data;
    }
}
