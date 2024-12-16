import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Header from './Sections/Header.jsx';
import SignUp from './Pages/Sign-up.jsx';
import './index.css';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));
root.render(<App />);