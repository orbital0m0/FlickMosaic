import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import React from 'react';

import Status from '@/components/Status';

type AppErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: unknown;
};

class ErrorBoundaryInner extends React.Component<
  { onReset: () => void; children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { onReset: () => void; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(): void {
    // You can log the error to an error reporting service here if needed
  }

  handleReset(): void {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset();
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      const isNotFound = (this.state.error as Error)?.name === 'NotFoundError';
      // 404 에러인 경우
      if (isNotFound) {
        return <Status.NotFoundState message={(this.state.error as Error)?.message || '영화를 찾을 수 없습니다'} />;
      }
      const message = (this.state.error as Error)?.message ?? '알 수 없는 오류가 발생했어요';
      return <Status.ErrorState message={message} retry={this.handleReset} />;
    }
    return this.props.children;
  }
}

const AppErrorBoundary: React.FC<AppErrorBoundaryProps> = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary();
  return <ErrorBoundaryInner onReset={reset}>{children}</ErrorBoundaryInner>;
};

export default AppErrorBoundary;
