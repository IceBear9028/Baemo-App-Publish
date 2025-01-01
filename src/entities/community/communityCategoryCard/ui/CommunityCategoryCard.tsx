import {CommunityCategory} from '~/shared/mapper/community/lib/communityCategory.ts';
import {useToken} from '@gluestack-style/react';
import styled from 'styled-components/native';
import ArrowIcon from '~/shared/images/svg/game_arrow.svg';
import {Badge, BadgeText, Heading} from '@gluestack-ui/themed';

interface CommunityCategoryCardProps extends CommunityCategory {
  onPress?: () => void;
}

export const CommunityCategoryCard = (props: CommunityCategoryCardProps) => {
  const backgroundColor = useToken('colors', 'trueGray50');
  console.log(backgroundColor);
  return (
    <StyledContainer onPress={props.onPress} background={backgroundColor}>
      <StyledHeader>
        <Heading size={'sm'}>{props.name}</Heading>
        {props.isSubscribed && (
          <Badge>
            <BadgeText>구독중</BadgeText>
          </Badge>
        )}
      </StyledHeader>
      <ArrowIcon />
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity<{background: string}>`
  background: ${({background}) => background};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 76px;
  border-radius: 10px;
`;

const StyledHeader = styled.View`
  flex-direction: row;
  gap: 8px;
`;
