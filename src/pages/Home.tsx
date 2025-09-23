import {useEffect, useState} from "react";
import {getPosts, type IPost} from "../services/apiHandling";
import PostList from "../components/PostList";
import './Home.css';
import {useNavigate} from 'react-router-dom';
import NavBar from "../components/Navbar/NavBar.tsx";
import NewsLetter from "../components/Newsletter/Newsletter.tsx";
import About from "../components/About/About.tsx";
import Footer from "../components/Footer/Footer.tsx";

const Homepage: React.FC = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            const fetchedPosts = await getPosts();
            setPosts(fetchedPosts.reverse());
        };
        fetchPosts();
    }, []);

    const handlePostClick = (post: IPost) => {
        navigate(`/post/${post.id}`);
    };

    return (
        <div className="homepage-container">
            <NavBar/>
            <div className="homepage-content-wrapper">
                {/* 👇 HERO SECTION */}
                <section className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Exploring Tomorrow's Tech, Today
                        </h1>
                        <p className="hero-subtitle">
                            A space for stories, ideas, and explorations of the modern world.
                        </p>
                        <p className="hero-subtitle">
                            Diving deep into the future of technology, innovation, digital trends, and how they shape
                            our everyday lives and tomorrow's world
                        </p>
                    </div>
                </section>

                <h3 className="posts-header">Posts</h3>

                {/* 👇 POST LIST */}
                <PostList posts={posts} onPostClick={handlePostClick}/>
            </div>
            <NewsLetter/>
            <About/>
            <Footer/>
        </div>
    );
};

export default Homepage;