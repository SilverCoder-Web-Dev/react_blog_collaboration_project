import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";

function App() {
  return (
    <h1>Hello world</h1>
    // <Router>
    //   <nav>
    //     <Link to="/">Home</Link> | <Link to="/post/1">Sample Post</Link>
    //   </nav>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/post/:id" element={<Post />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
