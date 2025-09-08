import type React from "react";
import { useParams } from "react-router-dom";


const Post: React.FC = () => {
  const { id } = useParams<{id: string}>();

  return <h1>Post ID: {id}</h1>;
};

export default Post;
