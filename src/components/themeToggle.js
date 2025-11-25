import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@context/ThemeContext';
import { IconSun, IconMoon } from '@components/icons';

const StyledThemeToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid var(--green);
  border-radius: var(--border-radius);
  padding: 10px;
  margin-left: 15px;
  color: var(--green);
  cursor: pointer;
  transition: var(--transition);
  width: 42px;
  height: 42px;
  /* Better touch target for mobile */
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  svg {
    width: 20px;
    height: 20px;
    transition: var(--transition);
    pointer-events: none;
  }

  /* Hover effects only for devices that support hover */
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: var(--green-tint);
      box-shadow: 0 0 15px rgba(245, 166, 35, 0.25);
      transform: translateY(-2px);

      svg {
        transform: rotate(15deg);
      }
    }
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid var(--green);
    outline-offset: 3px;
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledThemeToggle
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      {theme === 'dark' ? <IconSun /> : <IconMoon />}
    </StyledThemeToggle>
  );
};

export default ThemeToggle;
