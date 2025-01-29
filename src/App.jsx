import React, { useState } from 'react';
import './App.css';
import AvatarUpload from './components/AvatarUpload';

function App() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [githubUsername, setGithubUsername] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'fullName':
        setFullName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'githubUsername':
        setGithubUsername(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Form submitted:', {
      fullName,
      email,
      githubUsername,
    });

    setFullName('');
    setEmail('');
    setGithubUsername('');
  };

  return (
    <div className="container">
      <h1>Your Journey to Coding Conf 2025 Starts Here!</h1>
      <p>Secure your spot at next year's biggest coding conference.</p>

      <AvatarUpload /> 

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input 
            type="text" 
            id="fullName" 
            placeholder="Enter your full name" 
            name="fullName" 
            value={fullName} 
         onChange={handleInputChange} required/>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Enter your email" 
            name="email" 
            value={email} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="githubUsername">GitHub Username:</label>
          <input 
            type="text" 
            id="githubUsername" 
            placeholder="Enter your GitHub username" 
            name="githubUsername" 
            value={githubUsername} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        <button className="generate-button" type="submit">
          Generate My Ticket
        </button>
      </form>
    </div>
  );
}

export default App;