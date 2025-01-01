import {MAX_IMAGE_COUNT, useSelectImages} from '~/features/community/articleImagePicker/model/useSelectImages.ts';
import styled from 'styled-components/native';
import {Button, ButtonText, Text} from '@gluestack-ui/themed';
import {ArticleImagePicker} from '~/features/community/articleImagePicker';
import AddPhotoIcon from '~/shared/images/svg/add_photo_alternate.svg';
import {useGetPickerImages} from '~/features/community/articleImagePicker/model/useGetPickerImages.ts';

interface ArticleBottomControlProps {
  statusType: 'group' | 'community' | 'notice';
}

export const ArticleBottomControl = ({statusType}: ArticleBottomControlProps) => {
  const {onSelectImages} = useSelectImages(statusType);
  const {getPrevImageCount} = useGetPickerImages(statusType);
  const prevImageCount = getPrevImageCount();
  const isDisabledPhoto = prevImageCount >= MAX_IMAGE_COUNT;

  return (
    <StyledContainer>
      <ArticleImagePicker statusType={statusType} />
      <StyledBottomContainer>
        <Button
          size={'xs'}
          onPress={onSelectImages}
          disabled={isDisabledPhoto}
          borderRadius={'$full'}
          variant={'outline'}
          action={'secondary'}
          borderColor={'$textLight300'}>
          <AddPhotoIcon />
          <StyledButtonTextContainer>
            <ButtonText>사진</ButtonText>
            <StyledTextContainer>
              <ButtonText size={'xs'}>{prevImageCount}</ButtonText>
              <ButtonText size={'xs'}>/</ButtonText>
              <ButtonText size={'xs'}>{MAX_IMAGE_COUNT}</ButtonText>
            </StyledTextContainer>
          </StyledButtonTextContainer>
        </Button>
      </StyledBottomContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  border-top-color: #efefef;
  border-top-width: 1px;
`;

const StyledBottomContainer = styled.View`
  padding: 12px 20px 8px 20px;
  flex-direction: row;
  gap: 8px;
`;

const StyledButtonTextContainer = styled.View`
  margin-left: 4px;
  flex-direction: row;
  gap: 4px;
`;

const StyledTextContainer = styled.View`
  flex-direction: row;
  gap: 2px;
`;
