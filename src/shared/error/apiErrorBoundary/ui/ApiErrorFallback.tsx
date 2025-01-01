import {CommonErrorFallback, ErrorBoundaryProps} from './CommonErrorFallback.tsx';
import AuthIcon from '~/shared/images/svg/fallback_auth.svg';
import ServerIcon from '~/shared/images/svg/fallback_server.svg';

export const ApiErrorFallback = (props: ErrorBoundaryProps) => {
  const code = props.error.response?.status;
  const apiCode = props.error.response?.data.code;

  console.log('code, apiCode', code, apiCode);

  if (code === 400) {
    switch (apiCode) {
      default:
        return (
          <CommonErrorFallback {...props} title={'잘못된 접근입니다.'}>
            <AuthIcon />
          </CommonErrorFallback>
        );
    }
  }

  if (code === 500) {
    switch (apiCode) {
      default:
        return (
          <CommonErrorFallback {...props} title={'서버에 오류가 발생했습니다.'}>
            <ServerIcon />
          </CommonErrorFallback>
        );
    }
  }

  return (
    <CommonErrorFallback {...props} title={'예상치 못한 오류가 발생했습니다.'}>
      <ServerIcon />
    </CommonErrorFallback>
  );
};
