import {Dimensions} from 'react-native';
import {Fragment, useState} from 'react';
import styled from 'styled-components/native';
import {Image as ImageGlueStack} from '@gluestack-ui/themed';
import ImageView from 'react-native-image-viewing';

interface ImageListProps {
  srcList?: {uri: string}[];
}

interface ImageItemProps {
  src: string;
  onPress: () => void;
}

export const ImageList = ({srcList}: ImageListProps) => {
  const [imageId, setImageId] = useState<number>(0);
  const [visible, setIsVisible] = useState(false);

  function pressImage(index: number) {
    setImageId(index);
    setIsVisible(true);
  }

  return (
    <Fragment>
      {srcList && (
        <Fragment>
          <StyledContainer>
            {srcList.map((src, index) => (
              <ImageItem key={`${index}-${src}`} src={src.uri} onPress={() => pressImage(index)} />
            ))}
          </StyledContainer>
          <ImageView images={srcList} imageIndex={imageId} visible={visible} onRequestClose={() => setIsVisible(false)} />
        </Fragment>
      )}
    </Fragment>
  );
};

const ImageItem = ({src, onPress}: ImageItemProps) => {
  return (
    <StyledImageContainer onPress={onPress}>
      <ImageGlueStack
        borderRadius={8}
        alt={'글의 이미지'}
        style={{
          width: '100%', // Viewport의 가로 길이
          height: undefined, // 높이를 자동으로 설정
          aspectRatio: 1.4, // 계산된 비율 사용
          backgroundColor: '#ececec',
        }}
        source={{uri: src}}
      />
    </StyledImageContainer>
  );
};

const StyledContainer = styled.View`
  gap: 10px;
`;

const StyledImageContainer = styled.Pressable`
  border-width: 1px;
  border-color: #ededed;
  border-radius: 8px;
`;
