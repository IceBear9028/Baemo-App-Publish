import styled from 'styled-components/native';
import {useToken} from '@gluestack-style/react';
import {Image, Text} from '@gluestack-ui/themed';
import AddIcon from '~/shared/images/svg/add_circle.svg';
import {useBackgroundImageStore} from '../model/useBackgroundImageStore.ts';

export const SelectBackgroundImage = () => {
  const {background, selectBackground} = useBackgroundImageStore();
  const bgColor = useToken('colors', 'trueGray100');

  return (
    <StyledContainer>
      <Text color="$textLight800" lineHeight="$xs" size={'sm'}>
        배경 사진
      </Text>
      <StyledBackgroundContainer bgColor={bgColor} onPress={selectBackground}>
        {background?.uri ? (
          <Image
            key={background.uri}
            source={{
              uri: background?.uri,
            }}
            alt={'backgroundImg'}
            style={{width: '100%', height: 200, borderRadius: 12}}
          />
        ) : (
          <StyledImgText>
            <AddIcon />
            <Text lineHeight="$xs" size={'sm'}>
              터치하여 사진 선택
            </Text>
          </StyledImgText>
        )}
      </StyledBackgroundContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  gap: 4px;
`;

const StyledBackgroundContainer = styled.TouchableOpacity<{bgColor: string}>`
  background: ${({bgColor}) => `${bgColor};`};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const StyledImgText = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;
