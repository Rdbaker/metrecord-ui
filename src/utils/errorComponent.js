import React from 'react';

const FALLBACK_COMPONENT = () => {
  <h1>Something went wrong.</h1>
}

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.warn(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      const Fallback = this.props.FallbackComponent
      return Fallback ? <Fallback /> : <FALLBACK_COMPONENT />;
    }

    return this.props.children; 
  }
}

export const withErrorBoundary = (Component, FallbackComponent = FALLBACK_COMPONENT) => (props) => (
  <ErrorBoundary FallbackComponent={FallbackComponent}>
    <Component {...props} />
  </ErrorBoundary>
)