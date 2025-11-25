import React, { useRef, useEffect, useState, useMemo } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled, { keyframes } from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Layout } from '@components';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const StyledArchivePage = styled.main`
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledHeader = styled.header`
  margin-bottom: 80px;
  text-align: center;

  h1 {
    margin-bottom: 16px;
    background: linear-gradient(
      135deg,
      var(--lightest-slate) 0%,
      var(--green) 50%,
      var(--accent-secondary) 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s ease-in-out infinite;
  }

  .subtitle {
    max-width: 600px;
    margin: 0 auto;
    color: var(--slate);
    font-size: var(--fz-lg);
    font-family: var(--font-sans);
    font-weight: 400;
    line-height: 1.6;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 60px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, var(--light-navy) 0%, var(--lightest-navy) 100%);
  border: 1px solid var(--lightest-navy);
  border-radius: 16px;
  padding: 28px;
  text-align: center;
  transition: var(--transition);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.$accentColor || 'var(--green)'};
    opacity: 0;
    transition: var(--transition);
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${props => props.$accentColor || 'var(--green)'};
    box-shadow: 0 20px 40px -20px var(--navy-shadow);

    &::before {
      opacity: 1;
    }
  }

  .stat-number {
    font-size: 48px;
    font-weight: 700;
    font-family: var(--font-mono);
    color: ${props => props.$accentColor || 'var(--green)'};
    line-height: 1;
    margin-bottom: 8px;
  }

  .stat-label {
    font-size: var(--fz-sm);
    color: var(--slate);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 500;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 48px;
  justify-content: center;
`;

const FilterButton = styled.button`
  background: ${props => (props.$active ? 'var(--green)' : 'var(--light-navy)')};
  color: ${props => (props.$active ? 'var(--navy)' : 'var(--slate)')};
  border: 1px solid ${props => (props.$active ? 'var(--green)' : 'var(--lightest-navy)')};
  border-radius: 100px;
  padding: 10px 20px;
  font-size: var(--fz-sm);
  font-family: var(--font-mono);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 8px;

  .count {
    background: ${props => (props.$active ? 'rgba(0,0,0,0.2)' : 'var(--lightest-navy)')};
    padding: 2px 8px;
    border-radius: 100px;
    font-size: var(--fz-xxs);
  }

  &:hover {
    background: ${props => (props.$active ? 'var(--green)' : 'var(--lightest-navy)')};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--navy-shadow);
  }
`;

const ComponentSection = styled.section`
  margin-bottom: 64px;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${props => props.$delay || '0s'};
  opacity: 0;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;

const ComponentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--lightest-navy);

  .icon-wrapper {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.$color || 'var(--green-tint)'};
    border-radius: 12px;
    color: ${props => props.$iconColor || 'var(--green)'};

    svg {
      width: 24px;
      height: 24px;
    }
  }

  h2 {
    font-size: var(--fz-xxl);
    color: var(--lightest-slate);
    margin: 0;
    flex-grow: 1;
  }

  .commit-count {
    font-size: var(--fz-sm);
    color: var(--slate);
    font-family: var(--font-mono);
    background: var(--lightest-navy);
    padding: 6px 14px;
    border-radius: 100px;
  }
`;

const CommitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CommitCard = styled.article`
  background: var(--light-navy);
  border: 1px solid var(--lightest-navy);
  border-radius: 12px;
  padding: 24px;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--green);
    opacity: 0;
    transition: var(--transition);
  }

  &:hover {
    transform: translateY(-4px);
    border-color: var(--green);
    box-shadow: 0 20px 40px -20px var(--navy-shadow);

    &::before {
      opacity: 1;
    }

    .commit-title {
      color: var(--green);
    }
  }

  .commit-date {
    font-size: var(--fz-xxs);
    font-family: var(--font-mono);
    color: var(--slate);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 6px;

    &::before {
      content: '';
      width: 6px;
      height: 6px;
      background: var(--green);
      border-radius: 50%;
    }
  }

  .commit-title {
    font-size: var(--fz-lg);
    font-weight: 500;
    color: var(--lightest-slate);
    line-height: 1.4;
    margin-bottom: 16px;
    flex-grow: 1;
    transition: var(--transition);
  }

  .commit-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 16px;
    border-top: 1px solid var(--lightest-navy);
  }

  .commit-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--slate);
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    transition: var(--transition);

    svg {
      width: 18px;
      height: 18px;
    }

    &:hover {
      color: var(--green);
    }
  }

  .commit-hash {
    font-size: var(--fz-xxs);
    font-family: var(--font-mono);
    color: var(--dark-slate);
    background: var(--lightest-navy);
    padding: 4px 10px;
    border-radius: 6px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 40px;
  color: var(--slate);

  svg {
    width: 64px;
    height: 64px;
    margin-bottom: 24px;
    color: var(--dark-slate);
  }

  h3 {
    color: var(--light-slate);
    margin-bottom: 8px;
  }
`;

const TimelineView = styled.div`
  position: relative;
  padding-left: 32px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, var(--green), var(--accent-secondary));
    border-radius: 1px;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-bottom: 32px;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${props => props.$delay || '0s'};
  opacity: 0;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }

  &::before {
    content: '';
    position: absolute;
    left: -37px;
    top: 4px;
    width: 12px;
    height: 12px;
    background: var(--navy);
    border: 2px solid var(--green);
    border-radius: 50%;
    transition: var(--transition);
  }

  &:hover::before {
    background: var(--green);
    box-shadow: 0 0 20px var(--green);
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  justify-content: center;
`;

const ToggleButton = styled.button`
  background: ${props => (props.$active ? 'var(--lightest-navy)' : 'transparent')};
  color: ${props => (props.$active ? 'var(--green)' : 'var(--slate)')};
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: var(--fz-sm);
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: var(--lightest-navy);
    color: var(--green);
  }
`;

const componentIcons = {
  'Linux kernel': 'Linux',
  'Userspace driver': 'Folder',
  'Device tree': 'Folder',
  'Embedded software': 'Folder',
  PetaLinux: 'Folder',
  'AIE Examples': 'Folder',
};

const componentColors = {
  'Linux kernel': { bg: 'rgba(245, 166, 35, 0.1)', icon: '#f5a623' },
  'Userspace driver': { bg: 'rgba(107, 143, 163, 0.1)', icon: '#6b8fa3' },
  'Device tree': { bg: 'rgba(232, 121, 169, 0.1)', icon: '#e879a9' },
  'Embedded software': { bg: 'rgba(139, 233, 253, 0.15)', icon: '#8be9fd' },
  PetaLinux: { bg: 'rgba(80, 250, 123, 0.1)', icon: '#50fa7b' },
  'AIE Examples': { bg: 'rgba(189, 147, 249, 0.1)', icon: '#bd93f9' },
};

const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getCommitHash = githubUrl => {
  if (!githubUrl) {return '';}
  const parts = githubUrl.split('/');
  const hash = parts[parts.length - 1];
  return hash.substring(0, 7);
};

const ArchivePage = ({ location, data }) => {
  const projects = data.allMarkdownRemark.edges;
  const revealTitle = useRef(null);
  const revealStats = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'timeline'

  // Group projects by component
  const groupedProjects = useMemo(() => {
    const groups = {};
    projects.forEach(({ node }) => {
      const component = node.frontmatter.component || 'Other';
      if (!groups[component]) {
        groups[component] = [];
      }
      groups[component].push(node);
    });
    return groups;
  }, [projects]);

  const components = Object.keys(groupedProjects);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {return groupedProjects;}
    return { [activeFilter]: groupedProjects[activeFilter] };
  }, [activeFilter, groupedProjects]);

  useEffect(() => {
    if (prefersReducedMotion) {return;}
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealStats.current, srConfig(200, 0));
  }, [prefersReducedMotion]);

  const totalCommits = projects.length;
  const uniqueComponents = components.length;

  return (
    <Layout location={location}>
      <Helmet title="Archive" />

      <StyledArchivePage>
        <StyledHeader ref={revealTitle}>
          <h1 className="big-heading">Open Source Archive</h1>
          <p className="subtitle">
            A comprehensive collection of my open source contributions to embedded systems, Linux
            kernel, and AI engine runtime
          </p>
        </StyledHeader>

        <StatsGrid ref={revealStats}>
          <StatCard $accentColor="var(--green)">
            <div className="stat-number">{totalCommits}</div>
            <div className="stat-label">Total Contributions</div>
          </StatCard>
          <StatCard $accentColor="var(--accent-secondary)">
            <div className="stat-number">{uniqueComponents}</div>
            <div className="stat-label">Components</div>
          </StatCard>
          <StatCard $accentColor="var(--pink)">
            <div className="stat-number">{groupedProjects['Linux kernel']?.length || 0}</div>
            <div className="stat-label">Kernel Patches</div>
          </StatCard>
          <StatCard $accentColor="#8be9fd">
            <div className="stat-number">{groupedProjects['Userspace driver']?.length || 0}</div>
            <div className="stat-label">Driver Commits</div>
          </StatCard>
        </StatsGrid>

        <FilterContainer>
          <FilterButton $active={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>
            All
            <span className="count">{totalCommits}</span>
          </FilterButton>
          {components.map(component => (
            <FilterButton
              key={component}
              $active={activeFilter === component}
              onClick={() => setActiveFilter(component)}>
              {component}
              <span className="count">{groupedProjects[component].length}</span>
            </FilterButton>
          ))}
        </FilterContainer>

        <ViewToggle>
          <ToggleButton
            $active={viewMode === 'grid'}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view">
            <Icon name="Grid" />
            Grid
          </ToggleButton>
          <ToggleButton
            $active={viewMode === 'timeline'}
            onClick={() => setViewMode('timeline')}
            aria-label="Timeline view">
            <Icon name="List" />
            Timeline
          </ToggleButton>
        </ViewToggle>

        {Object.keys(filteredProjects).length === 0 ? (
          <EmptyState>
            <Icon name="Folder" />
            <h3>No contributions found</h3>
            <p>Try selecting a different filter</p>
          </EmptyState>
        ) : (
          Object.entries(filteredProjects).map(([component, commits], sectionIndex) => {
            const colors = componentColors[component] || {
              bg: 'var(--green-tint)',
              icon: 'var(--green)',
            };

            return (
              <ComponentSection key={component} $delay={`${sectionIndex * 0.1}s`}>
                <ComponentHeader $color={colors.bg} $iconColor={colors.icon}>
                  <div className="icon-wrapper">
                    <Icon name={componentIcons[component] || 'Folder'} />
                  </div>
                  <h2>{component}</h2>
                  <span className="commit-count">
                    {commits.length} commit{commits.length !== 1 ? 's' : ''}
                  </span>
                </ComponentHeader>

                {viewMode === 'grid' ? (
                  <CommitsGrid>
                    {commits.map((commit, i) => {
                      const { github, title, date } = commit.frontmatter;
                      return (
                        <CommitCard key={i}>
                          <div className="commit-date">{formatDate(date)}</div>
                          <h3 className="commit-title">{title}</h3>
                          <div className="commit-footer">
                            {github && (
                              <a
                                href={github}
                                className="commit-link"
                                target="_blank"
                                rel="noopener noreferrer">
                                <Icon name="GitHub" />
                                View commit
                              </a>
                            )}
                            <span className="commit-hash">{getCommitHash(github)}</span>
                          </div>
                        </CommitCard>
                      );
                    })}
                  </CommitsGrid>
                ) : (
                  <TimelineView>
                    {commits.map((commit, i) => {
                      const { github, title, date } = commit.frontmatter;
                      return (
                        <TimelineItem key={i} $delay={`${i * 0.05}s`}>
                          <CommitCard>
                            <div className="commit-date">{formatDate(date)}</div>
                            <h3 className="commit-title">{title}</h3>
                            <div className="commit-footer">
                              {github && (
                                <a
                                  href={github}
                                  className="commit-link"
                                  target="_blank"
                                  rel="noopener noreferrer">
                                  <Icon name="GitHub" />
                                  View commit
                                </a>
                              )}
                              <span className="commit-hash">{getCommitHash(github)}</span>
                            </div>
                          </CommitCard>
                        </TimelineItem>
                      );
                    })}
                  </TimelineView>
                )}
              </ComponentSection>
            );
          })
        )}
      </StyledArchivePage>
    </Layout>
  );
};

ArchivePage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default ArchivePage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/commits/" } }
      sort: { fields: [frontmatter___component, frontmatter___date], order: [ASC, DESC] }
    ) {
      edges {
        node {
          frontmatter {
            date
            title
            component
            github
            external
          }
          html
        }
      }
    }
  }
`;
