// src/components/PostList.tsx
import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import type { IPost } from '../services/apiHandling';
import PostCardSpinner from './Spinner/PostCardSpinner';
import './PostList.css';

interface IPostListProps {
  posts: IPost[];
  onPostClick: (post: IPost) => void;
}

const PostList: React.FC<IPostListProps> = ({ posts, onPostClick }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate "waking up server" delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 30000); // Adjust as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PostCardSpinner />;
  }

  if (!posts || posts.length === 0) {
    return <p className="no-posts-message">No posts available.</p>;
  }

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