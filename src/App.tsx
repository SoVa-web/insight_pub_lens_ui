import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm.tsx';
import LoginForm from './components/LoginForm.tsx';
import SearchForm from './components/SearchForm.tsx';
import PublicationDetails from './components/PublicationDetails.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/search" element={<SearchForm />} />
          <Route path="/publication/:id" element={<PublicationDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
