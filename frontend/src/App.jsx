import { useState } from 'react'
import './style/App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './components/AddTask'
import Signup from './components/Signup'
import Login from './components/Login'
import List from './components/List'
import UpdateTask from './components/UpdateTask'
import Footer from './components/Footer'
import Protected from './components/Protected'


function App() {
  return (
    <>
      <NavBar />

      <Routes>

        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        <Route path='/add' element={<Protected> <AddTask /> </Protected>} />
        <Route path='/' element={<Protected> <List /> </Protected>} />
        <Route path='/update/:id' element={<Protected> <UpdateTask /> </Protected>} />
      </Routes>

      <Footer />

    </>

  )
}

export default App
