import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // BrowserRouter 추가
import "./App.css";

import Main from "./pages/Main";
import Join from "./pages/Join";
import SignUp from "./pages/SignUp";
import Card from "./pages/Card";
import MyPage from "./pages/MyPage";
import HumanPage from "./pages/HumanPage"
import Edit from "./pages/Edit"
import PostDetail from "./pages/PostDetail";
import Search from "./pages/Search";
import CategSearch from "./pages/CategSearch";
import NextPage from "./pages/NextPage";
import MyPost from "./pages/MyPost";
import MyLikes from "./pages/MyLikes";
import SoSciPage from "./pages/SoSciPage";
import BusiEcoPage from "./pages/BusiEcoPage";
import SciencePage from "./pages/SciencePage";
import ComputerPage from "./pages/ComputerPage";
import BioPage from "./pages/BioPage";
import ArtPage from "./pages/ArtPage";
import EduPage from "./pages/EduPage";
import OtherCard from "./pages/OtherCard";
import OtherNextPage from "./pages/OtherNextPage";

function App() {
  return (
    <div className="App">
      {}
      <Router>
        <Routes>
          <Route exact path="/main" element={<Main />} />
          <Route exact path="/join" element={<Join />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/card" element={<Card />} />
          <Route exact path="/mypage" element={<MyPage />} />
          <Route exact path="/humanpage" element={<HumanPage />} />
          <Route exact path="/edit" element={<Edit />} />
          <Route exact path="/postdetail/:id" element={<PostDetail />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/categsearch" element={<CategSearch />} />
          <Route exact path="/nextpage" element={<NextPage />} />
          <Route exact path="/mypost" element={<MyPost />} />
          <Route exact path="/mylikes" element={<MyLikes />} />
          <Route exact path="/soscipage" element={<SoSciPage />} />
          <Route exact path="/busiecopage" element={<BusiEcoPage />} />
          <Route exact path="/sciencepage" element={<SciencePage />} />
          <Route exact path="/computerpage" element={<ComputerPage />} />
          <Route exact path="/biopage" element={<BioPage />} />
          <Route exact path="/artpage" element={<ArtPage />} />
          <Route exact path="/edupage" element={<EduPage />} />
          <Route exact path="/othercard" element={<OtherCard />} />
          <Route exact path="/othernextpage" element={<OtherNextPage />} />
          

        </Routes>
      </Router>
    </div>
  );
}

export default App;
