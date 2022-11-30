import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import {Box, AppBar, Toolbar, Typography, Button, IconButton} from '@mui/material';


const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(loginWithToken());
  }, []);

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position='static'>
      <h1>DUET: The Ultimate Events Social</h1>
      {
        auth.id ? <Home /> : <Login id='login-page' />
      }
      {
        !!auth.id  && (
          <div>
            <nav>
              <Link to='/'>Home</Link>
            </nav>
          </div>
        )
      }
      </AppBar>
    </Box>
  );
};

export default App;
