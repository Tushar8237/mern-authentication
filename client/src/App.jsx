import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Profile from "./pages/profile/Profile";
import Header from "./components/header/Header";
import SignIn from "./pages/auth/signin/SignIn";
import SignUp from "./pages/auth/signup/SignUp";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Layout from "./components/layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* Error route - Catch-all route for handling 404 errors */}
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
        
      </Layout>
      <ToastContainer 
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
    </BrowserRouter>
  );
}
export default App;

