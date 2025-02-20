import { memo } from 'react';
import './Header.css';

function Header({ 
  title = "Your Journey to Coding Conf 2025 Starts Here!",
  subtitle = "Secure your spot at next year's biggest coding conference.",
  logoSrc = "/assets/images/logo-full.svg",
  logoAlt = "Coding Conference"
}) {
  return (
    <header className="header">
      <a href="/" className="logo-link">
        <img 
          src={logoSrc} 
          alt={logoAlt} 
          className="header-logo"
        />
      </a>
      <h1 className="header-title">{title}</h1>
      <p className="header-subtitle">{subtitle}</p>
    </header>
  );
}

// Memoize the header since it rarely changes
export default memo(Header);
