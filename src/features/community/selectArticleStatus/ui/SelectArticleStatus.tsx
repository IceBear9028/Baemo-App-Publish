import {useEffect} from 'react';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';
import {Button, ButtonText, Heading} from '@gluestack-ui/themed';
import {ArticleStatusBadge} from '~/shared/ui';
import {ArticleCommunityStatus, ArticleStatus} from '~/shared/mapper/community';
import {ArticleGroupStatus} from '~/shared/mapper/groups';
import {useBottomSheetController} from '~/shared/bottomSheet';
import {SelectArticleStatusBottomSheet} from './SelectArticleStatusBottomSheet';
import {useArticleStatusStore} from '~/features/community/selectArticleStatus';
import {useToken} from '@gluestack-style/react';

interface SelectArticleStatusProps {
  initArticleStatus?: keyof ArticleStatus;
  statusType?: 'group' | 'community';
}

/** ### SelectArticleStatus()
 * #### 사용용도
 * - 글에 대한 타입을 선택하는 BottomSheet
 * #### 커뮤니티 글 작성 타입 (statusType === 'community')
 * ```
 * {
 *  '101' : '일상',
 *  '102' : '운동 모집'
 *  '103' : '모임 홍보'
 *  '104' : '파트너 모집'
 *  '105' : '대회 공지'
 * }
 * ```
 * #### 모임 글 작성 타입 (statusType === 'group')
 * ```
 * {
 *  '0' : '공지',
 *  '1' : '모임활동'
 *  '2' : '가입인사'
 *  '3' : '자유게시판'
 * }
 * ```
 * */
export const SelectArticleStatus = ({initArticleStatus, statusType = 'community'}: SelectArticleStatusProps) => {
  const {ref, openBottomSheet, closeBottomSheet} = useBottomSheetController();
  const {communityArticleStatus, setCommunityArticleStatus, groupArticleStatus, setGroupArticleStatus} = useArticleStatusStore();
  const prevArticleStatus = statusType === 'community' ? communityArticleStatus : groupArticleStatus;
  const borderColor = useToken('colors', 'borderLight100');

  function activateBottomSheet() {
    openBottomSheet();
    Keyboard.dismiss();
  }

  useEffect(() => {
    console.log('initArticleStatus', initArticleStatus);
    if (!initArticleStatus) {
      openBottomSheet();
    }
    if (statusType === 'community') {
      initArticleStatus && setCommunityArticleStatus(initArticleStatus as keyof ArticleCommunityStatus);
    } else {
      initArticleStatus && setGroupArticleStatus(initArticleStatus as keyof ArticleGroupStatus);
    }
  }, [initArticleStatus]);

  return (
    <StyledContainer>
      <StyledBorderContainer borderColor={borderColor}>
        {prevArticleStatus ? (
          <StyledBadgeContainer>{prevArticleStatus && <ArticleStatusBadge status={prevArticleStatus} />}</StyledBadgeContainer>
        ) : (
          <Heading size={'xs'} color={'$textLight600'}>
            게시글 주제
          </Heading>
        )}
        <StyledContents>
          {prevArticleStatus ? (
            <Button
              size={'xs'}
              height={28}
              variant={'outline'}
              action={'secondary'}
              borderColor={'$textLight300'}
              onPress={activateBottomSheet}>
              <ButtonText>변경</ButtonText>
            </Button>
          ) : (
            <Button size={'xs'} onPress={activateBottomSheet} borderColor={'$textLight300'} variant={'outline'} height={28}>
              <ButtonText>선택</ButtonText>
            </Button>
          )}
        </StyledContents>
        <SelectArticleStatusBottomSheet ref={ref} closeBottomSheet={closeBottomSheet} statusType={statusType} />
      </StyledBorderContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  padding: 0 20px;
`;

const StyledBorderContainer = styled.View<{borderColor: string}>`
  padding: 10px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-color: ${({borderColor}) => borderColor};
  border-bottom-width: 1px;
`;

const StyledContents = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const StyledBadgeContainer = styled.View`
  flex-direction: row;
  height: 28px;
`;
