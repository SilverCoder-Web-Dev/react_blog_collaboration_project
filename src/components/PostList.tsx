import React from 'react';
import PostCard from './PostCard';
import type { IPost } from '../services/apiHandling';
import './PostList.css';

// Define the props interface for PostList.
interface IPostListProps {
  posts: IPost[];
  onPostClick: (post: IPost) => void;
}

// The PostList component is responsible for mapping and rendering a list of PostCard components.
const PostList: React.FC<IPostListProps> = ({ posts, onPostClick}) => {
  if (!posts || posts.length === 0) {
    return <p className="no-posts-message">No posts available.</p>;
  }

  return (
    <main className="post-list-grid">
      {posts.map(post => (
        <PostCard key={post.id} post={post} onPostClick={() => onPostClick(post)}/>
      ))}
    </main>
  );
};

export default PostList;
