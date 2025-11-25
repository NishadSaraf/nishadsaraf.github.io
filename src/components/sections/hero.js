import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { keyframes } from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const terminalBlink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  position: relative;

  /* Gradient background overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--gradient-bg);
    pointer-events: none;
    z-index: -1;
  }

  /* Subtle animated gradient orb */
  &::after {
    content: '';
    position: absolute;
    top: 20%;
    right: 10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(245, 166, 35, 0.05) 0%, transparent 70%);
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;
    z-index: -1;
    animation: ${gradientMove} 15s ease-in-out infinite;

    @media (max-width: 768px) {
      width: 250px;
      height: 250px;
      top: 10%;
      right: 5%;
    }
  }

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  .terminal-line {
    display: inline-flex;
    align-items: center;
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 500;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }

    .terminal-prefix {
      color: var(--accent-secondary);
      margin-right: 8px;
      opacity: 0.8;
    }

    .terminal-text {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      min-height: 1.2em;
      position: relative;
      padding-right: 4px;

      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 2px;
        background-color: var(--green);
        animation: ${terminalBlink} 0.8s step-end infinite;
      }
    }
  }

  h2.big-heading {
    margin: 0;
    font-size: clamp(40px, 8vw, 80px);
    font-weight: 700;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, var(--lightest-slate) 0%, var(--light-slate) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 1;
    font-size: clamp(30px, 6vw, 60px);
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  p {
    margin: 25px 0 0;
    max-width: 560px;
    line-height: 1.6;
    color: var(--slate);

    a {
      color: var(--green);
      font-weight: 500;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 3px;
      }
    }
  }

  .cta-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(245, 166, 35, 0.1), transparent);
      transition: left 0.5s ease;
    }

    &:hover::before {
      left: 100%;
    }
  }
`;

const TypingText = ({
  text,
  startDelay = 0,
  typingSpeed = 80,
  deleteSpeed = 40,
  pauseTime = 2000,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (!isTyping || isPaused) {
      return;
    }

    if (!isDeleting) {
      // Typing phase
      if (displayedText.length < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, pause before deleting
        setIsPaused(true);
        const pauseTimeout = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseTime);
        return () => clearTimeout(pauseTimeout);
      }
    } else {
      // Deleting phase
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, deleteSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished deleting, pause before typing again
        setIsPaused(true);
        const pauseTimeout = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(false);
        }, 500);
        return () => clearTimeout(pauseTimeout);
      }
    }
  }, [displayedText, isTyping, isDeleting, isPaused, text, typingSpeed, deleteSpeed, pauseTime]);

  return <span className="terminal-text">{displayedText}</span>;
};

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = (
    <div className="terminal-line">
      <span className="terminal-prefix">$</span>
      {isMounted && !prefersReducedMotion ? (
        <TypingText text="Hi, my name is" startDelay={100} typingSpeed={70} />
      ) : (
        <span className="terminal-text">Hi, my name is</span>
      )}
    </div>
  );
  const two = <h2 className="big-heading">Nishad Saraf.</h2>;
  const three = <h3 className="medium-heading">I build system software.</h3>;
  const four = (
    <>
      <p>
        I'm a <a href="https://www.youtube.com/watch?v=r44RKWyfcFw">Silicon Valley–based</a>{' '}
        software engineer specializing in embedded and system software. I currently work on Linux
        kernel drivers, firmware, and userspace libraries for next-generation Neural Processing
        Units (NPUs) at <a href="https://www.xilinx.com/">Xilinx</a>.
      </p>
    </>
  );
  const five = (
    <a className="cta-link" href="/archive" target="_blank" rel="noreferrer">
      Explore my open-source work
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
