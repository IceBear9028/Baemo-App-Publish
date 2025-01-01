import React from 'react';
import styled from 'styled-components/native';
import {Groups} from '~/shared/mapper/groups';
import {Text} from '@gluestack-ui/themed';
import {CustomAvatar} from '~/shared/ui';

interface GroupCardProps extends Groups {
  onSelect: () => void;
}

export const GroupProfileCard = (props: GroupCardProps) => {
  return (
    <Container onPress={props.onSelect}>
      <CustomAvatar size={'lg'} name={props.groupsName} profileImage={props.gatheringThumbnail} />
      <InfoContainer>
        <Text size={'sm'} numberOfLines={1} ellipsizeMode={'tail'}>
          {props.groupsName}
        </Text>
      </InfoContainer>
    </Container>
  );
};

const Container = styled.Pressable`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33%;
  gap: 6px;
  margin-bottom: 18px;
`;

const InfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
`;
