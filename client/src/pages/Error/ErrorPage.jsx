import React from 'react';
import { useNavigate } from 'react-router-dom';
import MetaTag from '../../components/Meta/MetaTag';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <>
      <MetaTag
        title="Page Not Found - Lab Mantra"
        description="Sorry, the page you are looking for does not exist. Please check the URL or go back to the homepage."
        keyword="Lab Mantra, page not found, 404, error"
    />

      <div style={styles.container}>
        <div className="text-center">
          <h1 style={styles.heading}>404</h1>
          <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
          <button style={styles.button} onClick={handleRedirect}>
            Go to Home Page
          </button>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh',
    backgroundColor: 'var(--bg-light-greenblue)',
    textAlign: 'center',
    color: 'var(--bg-dark-blue)',
  },
  heading: {
    fontSize: '6rem',
    color: 'var(--color-blue-light)',
  },
  message: {
    fontSize: '1.5rem',
    color: 'var(--bg-dark-blue)',
    marginBottom: '1rem',
  },
  button: {
    backgroundColor: 'var(--bg-greenblue)',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1.5rem',
    fontSize: '1.2rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ErrorPage;
