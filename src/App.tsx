import {Routes, Route,} from "react-router-dom";
import  Layout  from "./layouts/Layout";
import Dashboard  from "./components/DashBoard";
import { SidebarProvider } from './contexts/SidebarContext';

function App() {
  return (
    <>
      <SidebarProvider>
          <Routes>
              {/* Blog Site url route */}
              <Route/>
              {/*Admin Dashboard*/}
              <Route path="/dashboard" element={<Layout><Dashboard/></Layout>}/>
              <Route/>
          </Routes>
      </SidebarProvider>
    </>
  );
}

export default App;
