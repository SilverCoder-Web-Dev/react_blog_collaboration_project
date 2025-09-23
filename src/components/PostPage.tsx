import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPosts, type IPost } from '../services/apiHandling';
import { MdArrowBack, MdCalendarToday} from 'react-icons/md';
import './PostPage.css';

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const posts = await getPosts();
        const foundPost = posts.find(p => p.id === id);
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post not found.');
        }
      } catch (err) {
        setError('Failed to load post.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="post-page">
        <div className="post-container">
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="post-page">
        <div className="post-container">
          <p className="error-message">{error || 'Post not found.'}</p>
          <button onClick={() => window.history.back()} className="btn-back">
            ← Back to Posts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="post-page">
      <div className="post-container">
        <button onClick={() => window.history.back()} className="btn-back">
          <MdArrowBack size={18} />
          Back to Posts
        </button>

        <article className="post-article">
          <header className="post-header">
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <span className="meta-item">
                <MdCalendarToday size={16} />
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              {/* {post.updatedAt !== post.createdAt && (
                <span className="meta-item updated">
                  Updated: {new Date(post.updatedAt).toLocaleDateString()}
                </span>
              )} */}
            </div>
          </header>

          {post.imageData && (
            <div className="post-image-container">
              <img
                src={post.imageData}
                alt={post.title}
                className="post-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/1200x600/3b82f6/ffffff?text=Image+Unavailable';
                }}
              />
            </div>
          )}

          <div className="post-body">
            <p>{post.body}</p>
          </div>

          <footer className="post-footer">
            <div className="tech-divider"></div>
            <p className="footer-text">
              Published on <strong>The Digital Frontier</strong> — where technology meets creativity.
            </p>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default PostPage;