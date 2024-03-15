import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Profile from "./pages/profile/Profile";
import Header from "./components/header/Header";
import SignIn from "./pages/auth/signin/SignIn";
import SignUp from "./pages/auth/signup/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;
