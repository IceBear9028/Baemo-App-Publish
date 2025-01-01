import styled from 'styled-components/native';
import {CloseIcon, Heading, Icon} from '@gluestack-ui/themed';
import React from 'react';

interface HeaderProps {
  title: string;
  isBorder?: boolean;
  onCloseBottomSheet?: () => void;
  children?: React.ReactNode;
}

export const BottomModalHeader = ({title, isBorder, onCloseBottomSheet, children}: HeaderProps) => {
  return (
    <StyledContainer isBorder={isBorder}>
      <StyledHeaderContainer>
        <Heading>{title}</Heading>
        {children}
      </StyledHeaderContainer>
      {onCloseBottomSheet && (
        <StyledCloseButton onPress={onCloseBottomSheet}>
          <Icon as={CloseIcon} color={'$textLight600'} />
        </StyledCloseButton>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View<{isBorder?: boolean}>`
  flex-direction: row;
  padding: 4px 20px 10px 20px;
  justify-content: space-between;
  ${({isBorder}) => (isBorder ? 'border-color : #f0eef8; border-bottom-width: 1px;' : '')}
`;

const StyledCloseButton = styled.Pressable`
  border-radius: 32px;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  background: #ededed;
`;

const StyledHeaderContainer = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;
