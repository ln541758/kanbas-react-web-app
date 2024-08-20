import axios from "axios";
interface Message {
    role: string; content: string; imageUrl?: string;
    revisedPrompt?: string; shape?: string;
}
export const getConversation = async () => {
    const response = await axios.get(
        "http://localhost:4000/api/openai/conversation");
    return response.data;
};
export const postMessage = async (message: any) => {
    const response = await axios.post(
        "http://localhost:4000/api/openai/conversation",
        message);
    return response.data;
};
export const requestImage = async (request: Message) => {
    const response = await axios.post(
        "http://localhost:4000/api/openai/conversation/images",
        request);
    return response.data;
};