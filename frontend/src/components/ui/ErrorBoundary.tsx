import { Component, type ErrorInfo, type ReactNode } from 'react';
import i18n from '@/lib/i18n';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/** Catches render errors so a broken page doesn't take down the whole app. */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-xl px-6 py-24 text-center">
          <h1 className="font-display text-3xl text-foreground">{i18n.t('error.title')}</h1>
          <p className="mt-3 text-muted-foreground">{i18n.t('error.body')}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
