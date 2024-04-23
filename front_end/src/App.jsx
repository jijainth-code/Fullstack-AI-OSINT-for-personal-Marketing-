import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import History from './components/History';
import Search from './components/Search';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Mydata from './components/Mydata';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <NavBar />
        <div className="pt-12 flex-1"> {/* Padding-top to push the content below the NavBar */}
          <Routes>
            <Route path="/history" element={<History />} />
            <Route path="/my-data" element={<Mydata />} />
            <Route path="/search" element={<Search />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
