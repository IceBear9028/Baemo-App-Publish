import styled from 'styled-components/native';
import React from 'react';

interface SettingCardProps {
  children?: React.ReactNode;
  onPress?: () => void;
}

export const SettingListCard = ({children, onPress}: SettingCardProps) => {
  return <StyledContainer onPress={onPress}>{children}</StyledContainer>;
};

const StyledContainer = styled.TouchableOpacity`
  flex-direction: row;
  gap: 13px;
  padding: 12px 20px;
`;
