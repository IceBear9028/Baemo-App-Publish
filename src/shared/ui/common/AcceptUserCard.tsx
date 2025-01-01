import styled from 'styled-components/native';
import {UserProfile} from '~/shared/mapper/userProfile';
import {Button, ButtonText, Heading, Text} from '@gluestack-ui/themed';
import {useMainNavigate} from '~/shared/route';
import {CustomAvatar} from '~/shared/ui';

interface AcceptUserCardProps extends UserProfile {
  subTitle?: string;
  onAccept?: () => void;
  onReject?: () => void;
}

export const AcceptUserCard = (props: AcceptUserCardProps) => {
  const {nickName, name, subTitle} = props;
  const {navigateUserProfile} = useMainNavigate();
  function pressEventHandler() {
    props.userId && navigateUserProfile({userId: props.userId, chat: false});
  }
  return (
    <StyledPressContainer>
      <CustomAvatar {...props} />
      <StyledContents>
        <StyledHeaderContainer onPress={pressEventHandler}>
          <Heading size={'sm'} numberOfLines={1}>
            {name ? name : nickName}
          </Heading>
          {subTitle && <Text size={'sm'}>{subTitle}</Text>}
        </StyledHeaderContainer>
        <StyledButtonGroups>
          {props.onReject && (
            <Button size={'xs'} variant={'link'} onPress={props.onReject}>
              <ButtonText>거절</ButtonText>
            </Button>
          )}
          {props.onAccept && (
            <Button size={'xs'} onPress={props.onAccept}>
              <ButtonText>수락</ButtonText>
            </Button>
          )}
        </StyledButtonGroups>
      </StyledContents>
    </StyledPressContainer>
  );
};

const StyledPressContainer = styled.View`
  flex-direction: row;
  flex: 1;
  padding: 12px 20px;
  gap: 16px;
`;

const StyledContents = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const StyledHeaderContainer = styled.Pressable`
  flex: 1;
  justify-content: space-between;
`;

const StyledButtonGroups = styled.View`
  flex-direction: row;
  gap: 20px;
  padding-right: 8px;
`;
