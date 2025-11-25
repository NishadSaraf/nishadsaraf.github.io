import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { keyframes, css } from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(245, 166, 35, 0.4);
  }
  70% {
    box-shadow: 0 0 0 12px rgba(245, 166, 35, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(245, 166, 35, 0);
  }
`;

const StyledJobsSection = styled.section`
  max-width: 900px;

  .section-header {
    margin-bottom: 50px;
  }
`;

const StyledTimeline = styled.div`
  position: relative;
  padding-left: 30px;

  /* Timeline vertical line */
  &::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--green) 0%, var(--lightest-navy) 100%);
    border-radius: 2px;
  }

  @media (max-width: 600px) {
    padding-left: 25px;

    &::before {
      left: 5px;
    }
  }
`;

const StyledTimelineItem = styled.div`
  position: relative;
  padding-bottom: 50px;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.6)};
  transition: opacity 0.3s ease;

  &:last-child {
    padding-bottom: 0;
  }

  &:hover {
    opacity: 1;
  }

  /* Timeline node */
  .timeline-node {
    position: absolute;
    left: -30px;
    top: 5px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--lightest-navy)')};
    border: 3px solid var(--navy);
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 2;

    ${({ isActive }) =>
    isActive &&
      css`
        animation: ${pulse} 2s infinite;
      `}

    &:hover {
      background: var(--green);
      transform: scale(1.2);
    }

    @media (max-width: 600px) {
      left: -25px;
      width: 14px;
      height: 14px;
    }
  }

  /* Content card */
  .timeline-content {
    background: var(--light-navy);
    border-radius: var(--border-radius);
    padding: 25px 30px;
    border: 1px solid ${({ isActive }) => (isActive ? 'var(--green)' : 'transparent')};
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      border-color: var(--green);
      transform: translateX(5px);
      box-shadow: 0 10px 30px -15px var(--navy-shadow);
    }

    @media (max-width: 600px) {
      padding: 20px;
    }
  }

  .timeline-header {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 5px;
  }

  .job-title {
    font-size: var(--fz-xl);
    font-weight: 600;
    color: var(--lightest-slate);
    margin: 0;
  }

  .company {
    color: var(--green);
    font-weight: 500;

    a {
      color: var(--green);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 3px;
      }
    }
  }

  .timeline-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 20px;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--slate);
  }

  .date-range {
    display: flex;
    align-items: center;
    gap: 6px;

    &::before {
      content: '';
      width: 12px;
      height: 12px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239A9A9A' stroke-width='2'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='16' y1='2' x2='16' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='2' x2='8' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='10' x2='21' y2='10'%3E%3C/line%3E%3C/svg%3E")
        no-repeat center;
      background-size: contain;
    }
  }

  .location {
    display: flex;
    align-items: center;
    gap: 6px;

    &::before {
      content: '';
      width: 12px;
      height: 12px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239A9A9A' stroke-width='2'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3'%3E%3C/circle%3E%3C/svg%3E")
        no-repeat center;
      background-size: contain;
    }
  }

  .job-description {
    ul {
      ${({ theme }) => theme.mixins.fancyList};
      margin: 0;
    }

    p {
      margin: 0 0 10px 0;
    }
  }

  /* Expanded state styling */
  .job-description {
    max-height: ${({ isActive }) => (isActive ? '500px' : '0')};
    overflow: hidden;
    transition: max-height 0.4s ease;
  }

  &.expanded .job-description {
    max-height: 500px;
  }
`;

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;

  const [activeJobId, setActiveJobId] = useState(0);
  const revealContainer = useRef(null);
  const timelineItems = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());

    // Stagger reveal timeline items
    timelineItems.current.forEach((item, i) => {
      if (item) {
        sr.reveal(item, srConfig(i * 100));
      }
    });
  }, []);

  const handleItemClick = index => {
    setActiveJobId(activeJobId === index ? -1 : index);
  };

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className="numbered-heading section-header">Career Journey</h2>

      <StyledTimeline>
        {jobsData &&
          jobsData.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { title, url, company, range, location } = frontmatter;
            const isActive = activeJobId === i;

            return (
              <StyledTimelineItem
                key={i}
                ref={el => (timelineItems.current[i] = el)}
                isActive={isActive}
                className={isActive ? 'expanded' : ''}
                onClick={() => handleItemClick(i)}>
                <div className="timeline-node" />

                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3 className="job-title">{title}</h3>
                    <span className="company">
                      @{' '}
                      <a href={url} onClick={e => e.stopPropagation()}>
                        {company}
                      </a>
                    </span>
                  </div>

                  <div className="timeline-meta">
                    <span className="date-range">{range}</span>
                    {location && <span className="location">{location}</span>}
                  </div>

                  <div className="job-description" dangerouslySetInnerHTML={{ __html: html }} />
                </div>
              </StyledTimelineItem>
            );
          })}
      </StyledTimeline>
    </StyledJobsSection>
  );
};

export default Jobs;
