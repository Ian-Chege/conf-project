import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './PageTransition.css';

const createConfetti = (container) => {
  const colors = ['#ff7f50', '#ff6b45', '#ff9472', '#ffaa91'];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'success-animation__confetti';
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animation = `confetti-fall ${1 + Math.random() * 2}s ease-out forwards`;
    confetti.style.animationDelay = `${Math.random() * 0.5}s`;
    container.appendChild(confetti);
  }
};

function PageTransition({ children, isVisible, onExited }) {
  const confettiContainerRef = useRef(null);

  useEffect(() => {
    if (isVisible && confettiContainerRef.current) {
      const successCircle = document.createElement('div');
      successCircle.className = 'success-animation__circle';
      confettiContainerRef.current.appendChild(successCircle);
      createConfetti(confettiContainerRef.current);

      // Cleanup
      return () => {
        if (confettiContainerRef.current) {
          confettiContainerRef.current.innerHTML = '';
        }
      };
    }
  }, [isVisible]);

  return (
    <CSSTransition
      in={isVisible}
      timeout={500}
      classNames="page-transition"
      unmountOnExit
      onExited={onExited}
    >
      <div className="page-transition-container">
        <div className="success-animation" ref={confettiContainerRef} />
        {children}
      </div>
    </CSSTransition>
  );
}

export default PageTransition;
