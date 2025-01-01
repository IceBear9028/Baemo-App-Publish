import styled from 'styled-components/native';
import {Avatar, AvatarImage, Button, ButtonText} from '@gluestack-ui/themed';
import AddIcon from '~/shared/images/svg/add_circle.svg';
import {useProfileImageStore} from '~/shared/selectProfileImage/model/useProfileImageStore.ts';

interface ProfileImageInputProps {
  placeholder: string | null;
}
export const ProfileImageInput = ({placeholder}: ProfileImageInputProps) => {
  const {profileImage, selectProfileImage, resetProfileStore} = useProfileImageStore();

  return (
    <StyledContainer>
      <StyledContents>
        <Avatar size={'xl'} bgColor={'$trueGray100'}>
          {/*{profileImage?.uri ? <AvatarImage source={{uri: profileImage.uri}} alt={'profile 이미지'} /> : <AddIcon fill={'#ffffff'} />}*/}
          {profileImage?.uri ? (
            <AvatarImage source={{uri: profileImage.uri}} alt={'profile 이미지'} />
          ) : placeholder ? (
            <AvatarImage source={{uri: placeholder}} alt={'profile 이미지'} />
          ) : (
            <AddIcon fill={'#ffffff'} />
          )}
        </Avatar>
        <StyledButtonContainer>
          <Button onPress={selectProfileImage} variant={'outline'} size={'sm'}>
            <ButtonText>사진 선택</ButtonText>
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
  padding: 10px 0;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const StyledButtonContainer = styled.View`
  flex-direction: row;
  gap: 16px;
`;
