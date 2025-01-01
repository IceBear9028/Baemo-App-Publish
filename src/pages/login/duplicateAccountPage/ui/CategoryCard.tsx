import {useToken} from '@gluestack-style/react';
import {Heading} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import ArrowIcon from '~/shared/images/svg/game_arrow.svg';
import {DuplicateAccount} from '~/shared/mapper/login';
import NaverSvg from '~/shared/images/svg/btn_naver.svg';
import AppleSvg from '~/shared/images/svg/btn_apple.svg';
import KakaoSvg from '~/shared/images/svg/btn_kakao.svg';

interface CategoryCardProps extends DuplicateAccount {
  onPress?: () => void;
}

export const CategoryCard = (props: CategoryCardProps) => {
  const backgroundColor = useToken('colors', 'trueGray100');
  return (
    <StyledContainer onPress={props.onPress} background={backgroundColor}>
      <StyledHeader>
        {props.type === 'APPLE' && <AppleSvg />}
        {props.type === 'NAVER' && <NaverSvg />}
        {props.type === 'KAKAO' && <KakaoSvg />}
        <StyledTextContainer>
          <Heading size={'sm'}>{props.name}</Heading>
        </StyledTextContainer>
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
  gap: 16px;
`;

const StyledTextContainer = styled.View`
  gap: 2px;
  justify-content: center;
`;
