import { useEffect, useState } from "react";
import { getPosts, type IPost } from "../services/apiHandling";
import PostList from "../components/PostList";
import './Home.css';

// Homepage component
interface HomepageProps {
  onPostClick: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ onPostClick }) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts.reverse());
    };
    fetchPosts();
  }, []);

  return (
    <div className="homepage-container">
      <div className="homepage-content-wrapper">
        <header className="homepage-header">
          <h1 className="homepage-title">
            The Digital Frontier
          </h1>
          <p className="homepage-subtitle">
            A space for stories, ideas, and explorations of the modern world.
          </p>
        </header>
        <PostList posts={posts} onPostClick={onPostClick} />
      </div>
    </div>
  );
};

export default Homepage;
