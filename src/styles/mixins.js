import { css } from 'styled-components';

const button = css`
  color: var(--green);
  background-color: transparent;
  border: 1px solid var(--green);
  border-radius: var(--border-radius);
  font-size: var(--fz-xs);
  font-family: var(--font-mono);
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  padding: 1.25rem 1.75rem;
  transition: var(--transition);
  position: relative;
  overflow: hidden;

  &:hover,
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 20px rgba(245, 166, 35, 0.3);
    transform: translateY(-2px);
    background-color: var(--green-tint);
  }

  &:active {
    transform: translateY(0);
  }

  &:after {
    display: none !important;
  }
`;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--green);
      outline: 0;
    }
  `,

  inlineLink: css`
    display: inline-block;
    position: relative;
    color: var(--green);
    transition: var(--transition);
    font-weight: 500;

    &:hover,
    &:focus-visible {
      color: var(--green);
      outline: 0;
      &:after {
        width: 100%;
        opacity: 0.8;
      }
      & > * {
        color: var(--green) !important;
        transition: var(--transition);
      }
    }
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 2px;
      position: relative;
      bottom: 0.2em;
      background: linear-gradient(90deg, var(--green), var(--accent-secondary));
      opacity: 0.5;
      border-radius: 1px;
      @media (prefers-reduced-motion: no-preference) {
        transition: var(--transition);
      }
    }
  `,

  button,

  smallButton: css`
    color: var(--green);
    background-color: transparent;
    border: 1px solid var(--green);
    border-radius: var(--border-radius);
    padding: 0.75rem 1rem;
    font-size: var(--fz-xs);
    font-family: var(--font-mono);
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      outline: none;
      box-shadow: 0 0 15px rgba(245, 166, 35, 0.25);
      transform: translateY(-2px);
      background-color: var(--green-tint);
    }

    &:active {
      transform: translateY(0);
    }

    &:after {
      display: none !important;
    }
  `,

  bigButton: css`
    color: var(--green);
    background-color: transparent;
    border: 1px solid var(--green);
    border-radius: var(--border-radius);
    padding: 1.25rem 1.75rem;
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      outline: none;
      box-shadow: 0 0 25px rgba(245, 166, 35, 0.35);
      transform: translateY(-3px);
      background-color: var(--green-tint);
    }

    &:active {
      transform: translateY(0);
    }

    &:after {
      display: none !important;
    }
  `,

  boxShadow: css`
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      box-shadow: 0 20px 40px -15px var(--navy-shadow);
    }
  `,

  glowEffect: css`
    &:hover {
      box-shadow: 0 0 30px rgba(245, 166, 35, 0.15);
    }
  `,

  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-lg);
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      line-height: 1.5;
      &:before {
        content: '>';
        position: absolute;
        left: 0;
        color: var(--green);
        font-family: var(--font-mono);
        font-weight: 600;
      }
    }
  `,

  resetList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,

  cardStyle: css`
    background: var(--light-navy);
    border-radius: var(--border-radius);
    border: 1px solid transparent;
    transition: var(--transition);

    &:hover {
      border-color: var(--green);
      transform: translateY(-5px);
      box-shadow: 0 20px 40px -15px var(--navy-shadow);
    }
  `,
};

export default mixins;
