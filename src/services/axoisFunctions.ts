
// import axios from 'axios';
// import Post from '../pages/Post';

// /* ------ Get API URL variable From .env */
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// /* ------- Create interface for Post props */
// interface Post {
//   id: number;
//   title: string;
//   body: string;
//   image_name: string;
//   'created-on': string;
// }

// /* ------- Individaully write and export axios get function ------ */
// export const getPosts = async (): Promise<Post[]> => {
//   try {
//     const response = await axios.get<Post[]>(`${API_BASE_URL}/posts`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     throw new Error("Failed to fetch posts.");
//   }
// };


// /* ------- Individaully write and export axios create function ------ */
// export const createPost = async (postData: Omit<Post, 'id' | 'created-on'>): Promise<Post> => {
//   try {
//     const newPost = {
//       ...postData,
//       'created-on': new Date().toISOString(),
//     };
//     const response = await axios.post<Post>(`${API_BASE_URL}/posts`, newPost);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating post:", error);
//     throw new Error("Failed to create post.");
//   }
// };


// /* ------- Individaully create and export axios update function ------ */
// export const updatePost = async (postId: number, postData: Omit<Post, 'id' | 'created-on'>): Promise<Post> => {
//   try {
//     const updatedPost = {
//       ...postData,
//       'created-on': new Date().toISOString(),
//     };
//     const response = await axios.put<Post>(`${API_BASE_URL}/posts/${postId}`, updatedPost);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating post:", error);
//     throw new Error("Failed to update post.");
//   }
// };


// /* ------- Individaully create and export axios delete function ------ */
// export const deletePost = async (postId: number): Promise<void> => {
//   try {
//     await axios.delete(`${API_BASE_URL}/posts/${postId}`);
//   } catch (error) {
//     console.error("Error deleting post:", error);
//     throw new Error("Failed to delete post.");
//   }
// };

