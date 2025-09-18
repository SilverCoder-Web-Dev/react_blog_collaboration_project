import axios from "axios";

/* ======= Import API URL into variable ====== */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* ======= Define Post Interface ====== */

export interface IPost {
  id: string;
  title: string;
  body: string;
  imageData: string;         // 👈 Base64 image data
  createdAt: string;
  updatedAt: string;
}

/* ======= Create Post Function ====== */
export const createPost = async (
    postData: Omit<IPost, "id" | "createdAt" | "updatedAt">
): Promise<IPost> => {
    try {
        const now = new Date().toISOString();
        const newPost = {
            ...postData,
            id: crypto.randomUUID(), // Generate client-side ID if backend doesn't
            createdAt: now,
            updatedAt: now,
        };
        const response = await axios.post<IPost>(`${API_BASE_URL}/posts`, newPost);
        return response.data;
    } catch (error) {
        console.error(`Error Creating Post:`, error);
        throw new Error(`Failed to create post: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

/* ======= Update Post Function ====== */
export const updatePost = async (
    postId: string,
    postData: Partial<IPost>
): Promise<IPost> => {
    try {
        const updatedPost = {
            ...postData,
            updatedAt: new Date().toISOString(), // Only update this field
        };
        const response = await axios.patch<IPost>(`${API_BASE_URL}/posts/${postId}`, updatedPost);
        return response.data;
    } catch (error) {
        console.error(`Error Updating Post:`, error);
        throw new Error(`Failed to update post: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

/* ======= Get All Posts Function ====== */
export const getPosts = async (): Promise<IPost[]> => {
    try {
        const response = await axios.get<IPost[]>(`${API_BASE_URL}/posts`);
        return response.data;
    } catch (error) {
        console.error(`Error Getting Posts:`, error);
        throw new Error(`Failed to fetch posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

/* ======= Delete Post Function ====== */
export const deletePost = async (postId: string): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/posts/${postId}`);
    } catch (error) {
        console.error(`Error Deleting Post:`, error);
        throw new Error(`Failed to delete post: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};