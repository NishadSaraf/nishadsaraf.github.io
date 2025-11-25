import ScrollReveal from 'scrollreveal';

const isSSR = typeof window === 'undefined';

// Create ScrollReveal instance or a no-op mock for SSR
const sr = isSSR
  ? {
    // No-op mock for SSR to prevent null reference errors
    reveal: () => {},
    clean: () => {},
    destroy: () => {},
  }
  : ScrollReveal();

export default sr;
