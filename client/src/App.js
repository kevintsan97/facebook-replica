
import './App.css'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import useStyles from './styles'
import { Container, Grow, Grid } from '@material-ui/core'
import Navbar from './components/NavBar/Navbar'
import { getPosts } from './actions/posts'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'


function App() {
  return (
    <BrowserRouter>
      <Container maxwidth="lg">
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/auth' exact element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App;
