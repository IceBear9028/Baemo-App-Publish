import styled from 'styled-components/native';
import AddIcon from '~/shared/images/svg/add_circle.svg';
import {Avatar, AvatarImage} from '@gluestack-ui/themed';
import {useProfileImageStore} from '~/shared/selectProfileImage';

export const ProfileImagePicker = () => {
  const {profileImage, selectProfileImage} = useProfileImageStore();
  return (
    <StyledContainer>
      <StyledPressContainer onPress={selectProfileImage}>
        <Avatar size={'2xl'} bgColor={'$trueGray100'}>
          {profileImage?.uri ? <AvatarImage source={{uri: profileImage?.uri}} alt={'profile 이미지'} /> : <AddIcon fill={'#ffffff'} />}
        </Avatar>
      </StyledPressContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const StyledPressContainer = styled.TouchableOpacity``;
