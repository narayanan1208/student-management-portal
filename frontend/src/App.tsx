import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/pages/Home";
import Students from "./components/pages/Students";
import Manage from "./components/pages/Manage";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/manage" element={<Manage />} />
      </Routes>
    </Router>
  );
}

export default App;
