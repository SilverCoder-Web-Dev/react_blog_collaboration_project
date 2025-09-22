import './PostPage.css';
import type React from "react";
import type { IPost } from "../services/apiHandling";

interface IPostPageProps {
    post: IPost;
    onBack: () => void;
}

const PostPage: React.FC<IPostPageProps> = ({ post, onBack }) => {
    if (!post) {
        return null;
    }
    return (
        <div className="post-page-container">
            <div className="post-page-content">
                <button onClick={onBack} className="back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="back-button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 191-7-7m0 017-7m-7 7h18" />
                    </svg>
                    Go Back
                </button>
                <article className="post-article">
                    {post.imageData && (
                        <div className="post-image-container">
                            <img src={post.imageData} alt={post.title} className="post-image" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src="https://placehold.co/800x600/4a5568/ffffff?text=Image+Unavailable" }}/>
                        </div>
                    )}

                    <h1 className="post-title">
                        {post.title}
                    </h1>
                    <div className="post-meta">
                        <span className="post-meta-icon-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" className="post-meta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m-9 8h105M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </span>
                        <span>
                            {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                    <p className="post-body">
                        {post.body}
                    </p>
                </article>
            </div>
        </div>
    );
};

export default PostPage;