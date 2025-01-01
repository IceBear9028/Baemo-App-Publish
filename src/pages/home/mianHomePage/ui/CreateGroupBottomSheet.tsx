import {Heading} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {forwardRef, useCallback, useMemo} from 'react';
import {CategoryButton} from '~/shared/ui';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import GroupIcon from '~/shared/images/svg/create_group.svg';
import ThunderGameIcon from '~/shared/images/svg/create_thunderGame.svg';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useMainNavigate} from '~/shared/route';

interface Props {
  snapPoints?: string[];
  index?: number;
  closeBottomSheet: () => void;
}

/**
 * 제네릭 타입 설명 (제네릭 기입 시 아래와 같은 순서로 기입할 것)
 * - BottomSheetModalMethods : BottomSheetModal 의 ref 인자 타입
 * - Props : BottomSheetModal 내부에 선언한 자식 컴포넌트에 전달할 타입
 */
export const CreateGroupBottomSheet = forwardRef<BottomSheetModalMethods, Props>(
  ({index = 0, snapPoints = [350], closeBottomSheet}, ref) => {
    const {navigateCreateGroup, navigationCreateThunderExercise} = useMainNavigate();
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

    return (
      <BottomSheetModal ref={ref} index={index} snapPoints={resultSnapPoints} backdropComponent={renderBackdrop}>
        <StyledContentContainer>
          <StyledGameContents>
            {/*<CategoryButton*/}
            {/*  icon={<GroupGameIcon />}*/}
            {/*  onPress={() => {*/}
            {/*    navigateCreateGroupExercise();*/}
            {/*    closeBottomSheet();*/}
            {/*  }}>*/}
            {/*  <Heading size={'sm'}>모임 운동 만들기</Heading>*/}
            {/*</CategoryButton>*/}
            <Heading size={'sm'}>운동</Heading>
            <CategoryButton
              icon={<ThunderGameIcon />}
              onPress={() => {
                navigationCreateThunderExercise();
                closeBottomSheet();
              }}>
              <Heading size={'sm'}>번개 운동 만들기</Heading>
            </CategoryButton>
          </StyledGameContents>
          <StyledGameContents>
            <Heading size={'sm'}>모임</Heading>
            <CategoryButton
              icon={<GroupIcon />}
              onPress={() => {
                navigateCreateGroup();
                closeBottomSheet();
              }}>
              <Heading size={'sm'}>모임 만들기</Heading>
            </CategoryButton>
          </StyledGameContents>
        </StyledContentContainer>
      </BottomSheetModal>
    );
  },
);

const StyledContentContainer = styled.View`
  padding: 24px;
  gap: 24px;
`;

const StyledGameContents = styled.View`
  gap: 12px;
`;
