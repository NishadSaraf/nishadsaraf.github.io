import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledText = styled.div`
  p {
    line-height: 1.7;
  }

  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 8px 20px;
    padding: 0;
    margin: 25px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 8px;
      padding: 8px 12px 8px 28px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      background: var(--light-navy);
      border-radius: var(--border-radius);
      border: 1px solid transparent;
      transition: var(--transition);

      &:before {
        content: '>';
        position: absolute;
        left: 10px;
        color: var(--green);
        font-size: var(--fz-sm);
        font-weight: 600;
        line-height: 1.4;
      }

      &:hover {
        border-color: var(--green);
        transform: translateX(3px);
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);

    &:hover,
    &:focus {
      outline: 0;

      .overlay {
        opacity: 0;
      }

      .img {
        filter: none;
        transform: scale(1.02);
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      transition: all 0.4s ease;
      display: block;
    }

    /* Gradient overlay */
    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: var(--border-radius);
      transition: var(--transition);
      background: linear-gradient(
        135deg,
        rgba(245, 166, 35, 0.2) 0%,
        rgba(107, 143, 163, 0.2) 100%
      );
      pointer-events: none;
      z-index: 1;
    }

    /* Decorative border */
    &:before {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      border: 2px solid var(--green);
      top: 16px;
      left: 16px;
      z-index: -1;
      transition: var(--transition);
    }
  }

  &:hover .wrapper:before {
    top: 12px;
    left: 12px;
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'C',
    'C++',
    'Driver Development',
    'Linux Kernel Hacking',
    'Operating System',
    'HW/SW Debug Tools',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I'm an open-source enthusiast focused on building reliable system software&mdash;from
              Linux kernel drivers and firmware to userspace libraries for next-generation Neural
              Processing Units (NPUs). My experience ranges from designing custom circuit boards to
              creating Android applications that interact with IoT devices. I care deeply about
              system programming, performance, and the developer experience of the tools I build.
            </p>
            <p>
              I completed my M.S. in Electrical and Computer Engineering with a specialization in
              Embedded Systems at{' '}
              <a href="https://www.pdx.edu/">Portland State University, Oregon</a>. At{' '}
              <a href="https://www.xilinx.com/">Xilinx</a>, I build libraries and drivers for the
              industry's first{' '}
              <a href="https://www.xilinx.com/products/silicon-devices/acap/versal.html">
                ACAP (Adaptive Compute Acceleration Platform)
              </a>
              . Previously at Tesla, I developed validation frameworks for automotive use cases.
            </p>
            <p>Here are a few technologies I've been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
            <div className="overlay" />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
