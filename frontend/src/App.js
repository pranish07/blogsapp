import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import "./assets/sass/main.scss"
import Explore from "./pages/Explore";
import ListBlog from "./pages/ListBlog";
import AddBlog from "./pages/AddBlog";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/dashboard">
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
        <Route path="listBlog" element={<ListBlog/>}/>
        </Route> 
        <Route path="*" element={<b>Page not Found</b>}/>
      </Routes>
    </Router>
  );
}

export default App;
