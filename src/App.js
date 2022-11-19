import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Card, Divider, Rating, Box, CardContent, Grid, CardActionArea, CardActions, TextField, Button } from "@mui/material"
import './App.scss';
import './globals/hack-styles.scss';
import Reviews from './pages/Review';
import Home from './pages/Home'
//import axios from 'axios';


function App() {

  return (
    <div className="app fill-view">
      <Router>
        <Routes>
          <Route path='/' element={Home()}/>
          <Route path='/reviews' element={Reviews()}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
