import { useEffect, useState } from "react";
import { getPosts, type IPost } from "../services/apiHandling";
import PostList from "../components/PostList";
import './Home.css';
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import About from "../components/About/About";

// Homepage component
interface HomepageProps {
  posts: IPost[];
  onPostClick: (post: IPost) => void;
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
      <Navbar/>
      <div className="homepage-content-wrapper">
        {/* <Navbar/> */}
        <header className="homepage-header">
          <h1 className="homepage-title">
            Exploring Tomorrow's Tech, Today
          </h1>
          <p className="homepage-subtitle">
            A space for stories, ideas, and explorations of the modern world.
          </p>
          
          <p className="homepage-subtitle">
            Diving deep into the future of technology, innovation, digital trends, and how they shape our everyday lives and tomorrow's world
          </p>

          <button className="homepage-button">View our Work</button>

        </header>
        <PostList posts={posts} onPostClick={onPostClick} />
      </div>
      <NewsLetter/>
      <About/>
      <Footer/>
    </div>
  );
};

export default Homepage;
