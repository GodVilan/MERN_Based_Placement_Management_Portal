// import React, { useState } from 'react';
import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Profile from './Components/Profile';
import Login from './Components/Login';
import AdminPage from './Components/AdminPage';
import AddSkills from './Components/AddSkills';
import Certifications from './Components/Certifications';
import Jobs from './Components/Jobs';
import Problems from './Components/Problems';
import Leaderboard from './Components/Leaderboard';
import './App.css';
import Achievements from './Components/Achievements';

function App() {
  // const [uid, setUid] = useState(null);
  return (
    <div className='App'>
      <Routes>
        <Route path = '/Login' element = {<Login/>}></Route>
        <Route path = '/Profile/:uid' element = {<Profile/>}></Route>
        <Route path = '/AdminPage' element = {<AdminPage/>}></Route>
        <Route path = '/AddSkills/:uid' element={<AddSkills/>}></Route>
        <Route path = '/Achievements/:uid' element={<Achievements/>}></Route>
        <Route path = '/Certifications/:uid' element={<Certifications/>}></Route>
        <Route path = '/Jobs/:uid' element={<Jobs/>}></Route>
        <Route path = '/Problems/:uid' element={<Problems/>}></Route>
        <Route path = '/Leaderboard/:uid' element={<Leaderboard/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
