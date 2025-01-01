import styled from 'styled-components/native';
import {Avatar, AvatarImage, Button, ButtonText, Text} from '@gluestack-ui/themed';
import AddIcon from '~/shared/images/svg/add_circle.svg';
import {useProfileImageStore} from '~/shared/selectProfileImage/model/useProfileImageStore.ts';

interface SelectProfileImageProps {
  title?: string;
}

export const SelectProfileImage = ({title}: SelectProfileImageProps) => {
  const {profileImage, selectProfileImage, resetProfileStore} = useProfileImageStore();

  const changeProfileImageButtonPressHandler = () => {
    if (profileImage) {
      resetProfileStore();
    }
    selectProfileImage();
  };

  return (
    <StyledContainer>
      <Text color="$textLight800" lineHeight="$xs" size={'sm'}>
        {title ? title : '모임 썸네일'}
      </Text>
      <StyledContents>
        <StyledPressContainer onPress={changeProfileImageButtonPressHandler}>
          <Avatar size={'lg'} bgColor={'$trueGray100'}>
            {profileImage?.uri ? <AvatarImage source={{uri: profileImage?.uri}} alt={'profile 이미지'} /> : <AddIcon fill={'#ffffff'} />}
          </Avatar>
        </StyledPressContainer>
        <StyledButtonContainer>
          <Button onPress={changeProfileImageButtonPressHandler} variant={'outline'} size={'sm'}>
            <ButtonText>사진 변경</ButtonText>
          </Button>
        </StyledButtonContainer>
      </StyledContents>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  gap: 4px;
`;

const StyledContents = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledButtonContainer = styled.View`
  flex-direction: row;
  gap: 16px;
`;

const StyledPressContainer = styled.TouchableOpacity``;
