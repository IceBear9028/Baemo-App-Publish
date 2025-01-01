import styled from 'styled-components/native';
import {useToken} from '@gluestack-style/react';
import {CloseIcon, Icon, Image} from '@gluestack-ui/themed';
import {PickerImageInfo} from '../model/useArticleImageStore.ts';

type ImageCardProps = PickerImageInfo & {
  onDelete: () => void;
};

export const ImageCard = ({onDelete, ...props}: ImageCardProps) => {
  const closeColor = useToken('colors', 'orange600');
  return (
    <StyledContainer>
      <Image
        borderRadius={10}
        source={{
          uri: props.uri,
        }}
        alt={'picker 이미지'}
        style={{
          width: 54,
          height: 54,
          borderWidth: 1,
          borderColor: '#dfdfdf',
        }}
        width={54}
        height={54}
      />
      <StyledPressDelete onPress={onDelete} background={closeColor}>
        <Icon as={CloseIcon} color={'$textLight0'} size="2xs" />
      </StyledPressDelete>
    </StyledContainer>
  );
};

const StyledContainer = styled.Pressable``;

const StyledPressDelete = styled.Pressable<{background: string}>`
  position: absolute;
  background-color: ${({background}) => background};
  justify-content: center;
  align-items: center;
  top: -8px;
  right: -8px;
  border-radius: 12px;
  height: 20px;
  width: 20px;
`;
