import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignupPage from './pages';
import { useSelector } from 'react-redux';
import { useAppSelector } from './store';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Toaster />
      {/* <SignupPage /> */}
      <Login />
    </div>
  );
}

export default App;
