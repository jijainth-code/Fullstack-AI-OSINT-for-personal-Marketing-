import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Scrapper from './components/Scrapper';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Download from './components/Download';
import SignUp from './components/SignUp';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <NavBar />
          <div className="pl-64 flex-1"> {/* This padding-left equals the width of the NavBar */}
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/scrapper" element={<Scrapper />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/download" element={<Download />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
    </Router>
  );
}

export default App;
