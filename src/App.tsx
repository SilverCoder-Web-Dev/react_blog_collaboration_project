import { Routes, Route, } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./components/DashBoard";
import { SidebarProvider } from './contexts/SidebarContext';
import CreatePost from "./components/CreatePost";

function App() {
  return (
    <>
      <SidebarProvider>
          <Routes>
              {/* Blog Site url route */}
              <Route/>
              {/*Admin Dashboard*/}
              <Route path="/dashboard" element={<Layout><Dashboard/></Layout>}/>
              
              {/*Create Post*/}
              <Route path="/create-post" element={<Layout><CreatePost/></Layout>} />
              {/*Manage Post*/}

          <Route path="/" element={<Homepage onPostClick={function (): void {
            throw new Error("Function not implemented.");
          }} />} />
        </Routes>
      </SidebarProvider>
    </>
  );
}

export default App;
