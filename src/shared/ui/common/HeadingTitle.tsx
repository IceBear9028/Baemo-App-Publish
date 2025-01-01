import React from 'react';
import styled from 'styled-components/native';
import {Heading} from '@gluestack-ui/themed';
import {useToken} from '@gluestack-style/react';

interface HeadingTitleProps {
  children: React.ReactNode;
}

export const HeadingTitle = ({children}: HeadingTitleProps) => {
  const colorToken = useToken('colors', 'primary500');
  return (
    <StyledContainer>
      <Heading size={'lg'} color={colorToken}>
        {children}
      </Heading>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  padding-left: 20px;
`;
