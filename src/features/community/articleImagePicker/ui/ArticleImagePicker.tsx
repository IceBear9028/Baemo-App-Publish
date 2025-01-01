import styled from 'styled-components/native';
import {useDeleteImage} from '~/features/community/articleImagePicker/model/useDeleteImage.ts';
import {useGetPickerImages} from '~/features/community/articleImagePicker/model/useGetPickerImages.ts';
import {ImageCard} from '~/features/community/articleImagePicker/ui/ImageCard.tsx';

interface ArticleImagePicker {
  statusType: 'group' | 'community' | 'notice';
}

export const ArticleImagePicker = ({statusType = 'community'}: ArticleImagePicker) => {
  const {deleteImage} = useDeleteImage(statusType);
  const {getImages} = useGetPickerImages(statusType);
  const imageList = getImages();

  return (
    <StyledContainer>
      <StyledScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {imageList && imageList.length !== 0 && (
          <CardContainer>
            {imageList.map((img, index) => (
              <ImageCard
                key={`${img.uri}`}
                onDelete={() => {
                  deleteImage(index);
                }}
                {...img}
              />
            ))}
          </CardContainer>
        )}
      </StyledScrollView>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  margin: 0 20px 0 0;
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  overflow: visible;
`;

const StyledScrollView = styled.ScrollView`
  padding-left: 8px;
  overflow: visible;
`;

const CardContainer = styled.View`
  flex-direction: row;
  gap: 10px;
  margin: 16px 12px 0 12px;
  overflow: visible;
`;
