import './PostPage.css';
import type React from "react";
import type { IPost } from "../services/apiHandling";
import { HiArrowLeft } from 'react-icons/hi';
import { HiCalendarDateRange } from 'react-icons/hi2';

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
                    <HiArrowLeft className='back-button-icon' size={20} />
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
                            <HiCalendarDateRange className='post-meta-icon' size={16} />
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