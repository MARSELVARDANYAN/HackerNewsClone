import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import NavBar from "./components/NavBar";
import Newest from "./pages/Newest";
import Front from "./pages/PastPosts";
import Submit from "./pages/Submit";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SinglePost from "./components/SinglePost";
import Home from "./pages/Home";
import AllComments from "./pages/AllComments";
import PastPosts from "./pages/PastPosts";
import AskQuestion from "./pages/AskQuestion";
import QuestionList from "./pages/QuestionList";
import ShowPage from "./pages/ShowPage";
import CreateShowPage from "./pages/CreateSowPage";
import SingleShowPage from "./pages/SingleShowPage";
import JobsPage from "./pages/JobsPage";
import SingleJobPage from "./pages/SingleJobPage";
import Footer from "./footer/Footer";
import Logout from "./components/Logout";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/newest" element={<Newest />} />
          <Route path="/past" element={<PastPosts />} />
          <Route path="/front" element={<Front />} />
          <Route path="/comments" element={<AllComments />} />
          <Route path="/ask" element={<AskQuestion />} />
          <Route path="/questions" element={<QuestionList />} />
          <Route path="/show" element={<ShowPage />} />
          <Route path="/show/:id" element={<SingleShowPage />} />
          <Route path="/createShow" element={<CreateShowPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<SingleJobPage />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
