
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate, Link} from 'react-router-dom'
import { Container, Grow, Grid } from '@material-ui/core'
import Navbar from './components/NavBar/Navbar'
import { getPosts } from './actions/posts'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
      <Container maxwidth="xl">
        <Navbar />
        <Routes>
          {/* <Route path='/' exact element={<Navigate to="/posts" />}/> */}
          <Route path='/' exact element={<Home />}/>
          <Route path='/posts' exact element={<Home />} />
          <Route path='/posts/search' exact element = {<Home /> } />
          <Route path='/posts/:id' exact element={<PostDetails />} />
          <Route path='/auth' exact element={!user ? <Auth /> : <Navigate to="/posts" /> } />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App;
