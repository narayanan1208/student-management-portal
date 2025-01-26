// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../store";
// import Navigation from "./components/Navigation";
// import Home from "./components/pages/Home";
// import Students from "./components/pages/Students";
// import Manage from "./components/pages/Manage";
// import SignUp from "./components/pages/SignUp";
// import Login from "./components/pages/Login";

// const App = () => {
//   const isAuthenticated = useSelector(
//     (state: RootState) => state.auth.isAuthenticated
//   );

//   return (
//     <Router>
//       {!isAuthenticated ? (
//         <div>
//             <h1
//               style={{
//                 position: "absolute",
//                 left: "50%",
//                 bottom: "85%",
//                 transform: "translate(-50%, -50%)",
//                 fontSize: "3rem", // Large font size for background title
//                 color: "rgba(0, 123, 255, 0.2)", // Light color with opacity for background effect
//                 zIndex: 0, // Place it behind the login form
//                 textAlign: "center",
//                 fontWeight: "bold",
//                 animation: "fadeInScale 3s ease-out", // Applying animation
//               }}
//             >
//               Student Management System
//             </h1>
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="*" element={<Navigate to="/login" />} />
//           </Routes>
//         </div>
//       ) : (
//         <div>
//           <Navigation />
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/students" element={<Students />} />
//             <Route path="/manage" element={<Manage />} />
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </div>
//       )}
//     </Router>
//   );
// };

// export default App;

import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Navigation from "./components/Navigation";
import Home from "./components/pages/Home";
import Students from "./components/pages/Students";
import Manage from "./components/pages/Manage";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import { useEffect, useState } from "react";

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const [isSignUpPage, setIsSignUpPage] = useState(false);

  useEffect(() => {
    // Detect if the current page is signup and update the state
    if (location.pathname === "/signup") {
      setIsSignUpPage(true);
    } else {
      setIsSignUpPage(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isAuthenticated && location.pathname === "/login") {
      // Redirect to home page if the user is already authenticated
      // window.location.href = "/";
      navigate("/"); // Client-side ridirection
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <div>
      {/* Title should only be displayed when not on the signup page */}
      {!isAuthenticated && !isSignUpPage && (
        <h1
          style={{
            position: "absolute",
            left: "50%",
            bottom: "85%",
            transform: "translate(-50%, -50%)",
            fontSize: "3rem",
            color: "rgba(0, 123, 255, 0.2)",
            zIndex: 0,
            textAlign: "center",
            fontWeight: "bold",
            animation: "fadeInScale 3s ease-out",
          }}
        >
          Student Management System
        </h1>
      )}

      {/* Handle login and signup pages */}
      {!isAuthenticated ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <div>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/manage" element={<Manage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;


