import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;
  position: relative;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  /* Decorative background element */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(245, 166, 35, 0.05) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 500;
    letter-spacing: 0.05em;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 20px;
    background: linear-gradient(135deg, var(--lightest-slate) 0%, var(--light-slate) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    line-height: 1.7;
    max-width: 500px;
    margin: 0 auto;
    color: var(--slate);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    position: relative;

    /* Animated border glow effect */
    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(135deg, var(--green), var(--accent-secondary), var(--green));
      border-radius: calc(var(--border-radius) + 2px);
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover::before {
      opacity: 0.5;
      animation: ${pulse} 2s ease-in-out infinite;
    }
  }

  .terminal-cursor {
    display: inline-block;
    width: 2px;
    height: 1em;
    background: var(--green);
    margin-left: 4px;
    animation: ${pulse} 1s step-end infinite;
    vertical-align: text-bottom;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What's Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        Even though I'm not currently looking for new opportunities, my inbox is always open. If
        you'd like to talk about embedded systems, potential collaborations, or just say hi, I'll do
        my best to get back to you.
      </p>

      <a className="email-link" href={`mailto:${email}`}>
        Say Hello
      </a>
    </StyledContactSection>
  );
};

export default Contact;
