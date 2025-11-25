import { css } from 'styled-components';

const variables = css`
  :root {
    /* Background colors - deep charcoal with warm undertones */
    --dark-navy: #0d0d0d;
    --navy: #121215;
    --light-navy: #1a1a1e;
    --lightest-navy: #232328;
    --navy-shadow: rgba(13, 13, 13, 0.8);

    /* Text colors - warm gray hierarchy */
    --dark-slate: #6b6b70;
    --slate: #9a9a9a;
    --light-slate: #c5c5c5;
    --lightest-slate: #f0ede8;
    --white: #fafaf8;

    /* Accent colors */
    --green: #f5a623;
    --green-tint: rgba(245, 166, 35, 0.1);
    --accent-secondary: #6b8fa3;
    --accent-secondary-tint: rgba(107, 143, 163, 0.1);

    /* Additional accent colors */
    --pink: #e879a9;
    --blue: #6b8fa3;

    /* Typography */
    --font-sans: 'IBM Plex Sans', 'Inter', -apple-system, system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    /* Font sizes */
    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    /* Spacing and sizing */
    --border-radius: 8px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    /* Animations */
    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active:
      bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;

    /* Gradient for hero background */
    --gradient-bg:
      radial-gradient(ellipse at 20% 0%, rgba(245, 166, 35, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 100%, rgba(107, 143, 163, 0.06) 0%, transparent 50%);

    /* Navigation bar */
    --nav-bg: rgba(18, 18, 21, 0.85);
    --nav-bg-scrolled: rgba(18, 18, 21, 0.95);
  }

  [data-theme='light'] {
    --dark-navy: #fafaf8;
    --navy: #f5f5f3;
    --light-navy: #ebebea;
    --lightest-navy: #e0e0de;
    --navy-shadow: rgba(0, 0, 0, 0.08);
    --dark-slate: #7a7a7a;
    --slate: #5a5a5a;
    --light-slate: #3a3a3a;
    --lightest-slate: #1a1a1a;
    --white: #0d0d0d;
    --green: #d4890e;
    --green-tint: rgba(212, 137, 14, 0.1);
    --accent-secondary: #4a7085;
    --accent-secondary-tint: rgba(74, 112, 133, 0.1);

    --gradient-bg:
      radial-gradient(ellipse at 20% 0%, rgba(212, 137, 14, 0.05) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 100%, rgba(74, 112, 133, 0.04) 0%, transparent 50%);

    /* Navigation bar - light mode */
    --nav-bg: rgba(245, 245, 243, 0.85);
    --nav-bg-scrolled: rgba(245, 245, 243, 0.95);
  }
`;

export default variables;
