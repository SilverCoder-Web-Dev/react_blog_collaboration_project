// src/components/PostList.tsx
import React from 'react';
import PostCard from './PostCard';
import type { IPost } from '../services/apiHandling';
import PostCardSpinner from './Spinner/PostCardSpinner'; // 👈 Fixed path
import './PostList.css';

interface IPostListProps {
  posts: IPost[];
  onPostClick: (post: IPost) => void;
  loading?: boolean;
}

const PostList: React.FC<IPostListProps> = ({ posts, onPostClick, loading = false }) => {
  // 👇 Show spinner if loading
  if (loading) {
    return <PostCardSpinner />;
  }

  // 👇 Show "No posts" if not loading but no posts
  if (!posts || posts.length === 0) {
    return <p className="no-posts-message">No posts available.</p>;
  }

  // 👇 Show posts
  return (
      <main className="post-list-grid">
        {posts.map(post => (
            <PostCard
                key={post.id}
                post={post}
                onPostClick={() => onPostClick(post)}
            />
        ))}
      </main>
  );
};

export default PostList;