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

  svg {
    width: 20px;
    height: 20px;
    transition: var(--transition);
  }

  &:hover,
  &:focus {
    outline: none;
    background-color: var(--green-tint);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
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
