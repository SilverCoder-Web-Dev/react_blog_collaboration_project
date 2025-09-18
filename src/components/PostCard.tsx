import React from 'react';
import './PostCard.css';
import type { IPost } from '../services/apiHandling';

// Define the props interface for PostCard.
interface IPostCardProps {
  post: IPost;
  onPostClick: () => void;
  onEdit?: (post: IPost) => void;
  onDelete?: (postId: string) => void;
}


// The PostCard component is responsible for displaying a single blog post.
const PostCard: React.FC<IPostCardProps> = ({ post, onPostClick }) => {
  return (
    <div
      onClick={() => onPostClick()}
      
      className="post-card-container"
    >
      {post.imageData && (
        <div className="post-card-image-container">
          <img
            src={post.imageData}
            alt={post.title}
            className="post-card-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://placehold.co/800x600/4a5568/ffffff?text=Image+Unavailable";
            }}
          />
        </div>
      )}
      <div className="post-card-content">
        <h2 className="post-card-title">
          {post.title}
        </h2>
        <p className="post-card-body">
          {post.body}
        </p>
        <div className="post-card-meta">
          <span className="post-card-meta-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
          <span>
            {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
