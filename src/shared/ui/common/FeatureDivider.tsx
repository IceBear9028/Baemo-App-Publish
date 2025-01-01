import styled from 'styled-components/native';
import {useToken} from '@gluestack-style/react';

export const FeatureDivider = () => {
  // 아래 간격에 대한 색상 토큰
  const dividerColor = useToken('colors', 'borderLight50');
  return <StyledDivider background={dividerColor} />;
};

const StyledDivider = styled.View<{background: string}>`
  height: 10px;
  flex: 1;
  background: ${({background}) => background};
`;
