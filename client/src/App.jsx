import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Gigs from "./pages/Gigs";
import GigDetail from "./pages/GigDetail";
import AddGig from "./pages/AddGig";
import MyGigs from "./pages/MyGigs";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="max-w-[1440px] mx-auto p-5 flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search/gigs" element={<Gigs />} />
            <Route path="/gig/:id" element={<GigDetail />} />
            <Route path="/add-gig" element={<AddGig />} />
            <Route path="/my-gigs" element={<MyGigs />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
