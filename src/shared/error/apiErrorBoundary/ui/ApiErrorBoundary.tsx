import {ReactElement} from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import {ApiErrorFallback} from '~/shared/error/apiErrorBoundary/ui/ApiErrorFallback.tsx';
import {useQueryErrorResetBoundary} from '@tanstack/react-query';

interface ErrorBoundaryProps {
  children: ReactElement;
}

export const ApiErrorBoundary = ({children}: ErrorBoundaryProps) => {
  const {reset} = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary onError={reset} FallbackComponent={ApiErrorFallback as any}>
      {children}
    </ErrorBoundary>
  );
};
