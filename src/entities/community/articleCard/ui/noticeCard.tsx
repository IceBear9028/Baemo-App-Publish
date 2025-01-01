import styled from 'styled-components/native';
import {Badge, BadgeText, Text} from '@gluestack-ui/themed';
import {GroupArticleNotice} from 'shared/mapper/groups';

interface NoticeCardProps extends Omit<GroupArticleNotice, ''> {
  onPress?: () => void;
}

export const NoticeCard = (props: NoticeCardProps) => {
  return (
    <StyledPressContainer onPress={props.onPress}>
      <Badge action={'success'}>
        <BadgeText>{'공지사항'}</BadgeText>
      </Badge>
      <StyledTextContainer>
        <Text size={'sm'} numberOfLines={1}>
          {props.title}
        </Text>
      </StyledTextContainer>
    </StyledPressContainer>
  );
};

const StyledPressContainer = styled.Pressable`
  padding: 10px 20px;
  align-items: center;
  gap: 10px;
  flex-direction: row;
`;

const StyledTextContainer = styled.View`
  flex: 1;
`;
