import './PostCardSpinner.css';

const PostCardSpinner: React.FC = () => {
    return (
        <div className="post-card-spinner">
            <div className="spinner"></div>
            <span className="spinner-text">Waking up the server... posts loading </span>
        </div>
    );
};

export default PostCardSpinner;