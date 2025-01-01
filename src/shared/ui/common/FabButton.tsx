import {EditIcon, Fab, FabIcon, Heading} from '@gluestack-ui/themed';
import React, {ReactElement} from 'react';
import styled from 'styled-components/native';

interface FabButtonProps {
  onPress?: () => void;
  title?: string;
  icon?: ReactElement;
}

export const FabButton = ({onPress, title, icon}: FabButtonProps) => {
  return (
    <Fab size={'md'} placement="bottom right" onPress={onPress}>
      <StyledFabContents>
        {icon && icon}
        <Heading color={'$textLight0'} size={'sm'}>
          {title && title}
        </Heading>
      </StyledFabContents>
    </Fab>
  );
};

export const FabButtonContainer = styled.View`
  position: absolute;
  bottom: 40px;
  right: 4px;
`;

const StyledFabContents = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 6px;
  margin-left: 4px;
  margin-right: 4px;
`;
