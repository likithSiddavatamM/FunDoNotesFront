import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorOutline } from '@mui/icons-material';
import './PageNotFound.scss';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page-not-found-container">
      <div className="content">
        <ErrorOutline className="error-icon" />
        <h2 className="message">Oops! This page doesn't exist.</h2>
        <button className="back-button" onClick={() => { navigate('/dashboard/notes'); }}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
