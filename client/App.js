import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

import Navbar from './components/Navbar'
import Routes from './Routes'
import { getMovies } from './store';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
