import {forwardRef, useCallback, useMemo} from 'react';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {ArticleCommunityStatus, ArticleStatus} from '~/shared/mapper/community';
import {ArticleGroupStatus} from '~/shared/mapper/groups';
import {ArticleStatusCard} from '~/features/community/selectArticleStatus/ui/ArticleStatusCard.tsx';
import {useArticleStatusStore} from '~/features/community/selectArticleStatus';
import {useGroupRoleStore} from '~/features/groups/detailGroupsIntroduction';
import {applyStyle} from 'react-native-reanimated/lib/typescript/screenTransition/styleUpdater';
import styled from 'styled-components/native';
import {BottomModalHeader} from '~/shared/bottomSheet';

interface Props {
  snapPoints?: string[];
  index?: number;
  closeBottomSheet: () => void;
  statusType: 'group' | 'community';
}

/**
 * 제네릭 타입 설명 (제네릭 기입 시 아래와 같은 순서로 기입할 것)
 * - BottomSheetModalMethods : BottomSheetModal 의 ref 인자 타입
 * - Props : BottomSheetModal 내부에 선언한 자식 컴포넌트에 전달할 타입
 */
export const SelectArticleStatusBottomSheet = forwardRef<BottomSheetModalMethods, Props>(
  ({index = 0, snapPoints = ['30%'], closeBottomSheet, statusType}, ref) => {
    const {role} = useGroupRoleStore();
    const {communityArticleStatus, setCommunityArticleStatus, groupArticleStatus, setGroupArticleStatus} = useArticleStatusStore();
    const resultSnapPoints = useMemo(() => snapPoints, []);
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior="close"
          appearsOnIndex={0} // 이거 추가
          disappearsOnIndex={-1}
        />
      ),
      [],
    );
    const statusObject = statusType === 'group' ? ArticleGroupStatus.getGroupStatus(role) : new ArticleCommunityStatus();
    const statusKeyList = Object.keys(statusObject) as (keyof ArticleGroupStatus)[] | (keyof ArticleCommunityStatus)[];

    function selectEvent(input: keyof ArticleStatus) {
      if (statusType === 'group') {
        setGroupArticleStatus(input as keyof ArticleGroupStatus);
      } else {
        setCommunityArticleStatus(input as keyof ArticleCommunityStatus);
      }
      closeBottomSheet();
    }
    return (
      <BottomSheetModal ref={ref} index={index} snapPoints={resultSnapPoints} backdropComponent={renderBackdrop}>
        <BottomModalHeader title={'주제를 선택해주세요.'} />
        <StyledButtonContainer>
          {statusKeyList.map((status, index) => {
            const selectedStatus = statusType === 'group' ? groupArticleStatus : communityArticleStatus;
            const isSelect = status === selectedStatus;
            return <ArticleStatusCard key={`${index}-`} status={status} isSelect={isSelect} onPress={() => selectEvent(status)} />;
          })}
        </StyledButtonContainer>
      </BottomSheetModal>
    );
  },
);

const StyledButtonContainer = styled.View`
  padding: 20px;
  flex-direction: row;
  gap: 8px;
`;
