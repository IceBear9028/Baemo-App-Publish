// import React, {forwardRef, useCallback, useImperativeHandle, useRef} from 'react';
// import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
// import {useFetchDelChattingRoom} from '../model/useFetchDelChattingRoom.ts';
// import {Text} from '@gluestack-ui/themed';
// import styled from 'styled-components/native';
//
// export interface CustomBottomSheetModalMethods {
//   present: () => void;
//   dismiss: () => void;
// }
//
// interface CustomBottomSheetModalProps {
//   chatRoomId: string;
// }
//
// export const ChattingBottomSheet = forwardRef<CustomBottomSheetModalMethods, CustomBottomSheetModalProps>(({chatRoomId}, ref) => {
//   const bottomSheetModalRef = useRef<BottomSheetModal>(null);
//   const {deleteChattingRoom} = useFetchDelChattingRoom();
//
//   useImperativeHandle(
//     ref,
//     () => ({
//       present: () => bottomSheetModalRef.current?.present(),
//       dismiss: () => bottomSheetModalRef.current?.dismiss(),
//     }),
//     [],
//   );
//
//   const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} />, []);
//
//   return (
//     <BottomSheetModal ref={bottomSheetModalRef} index={0} snapPoints={['25%']} backdropComponent={renderBackdrop}>
//       <StyledContainer>
//         <StyledButton onPress={() => deleteChattingRoom(chatRoomId)}>
//           <Text>채팅방 나가기</Text>
//         </StyledButton>
//         <StyledButton onPress={() => bottomSheetModalRef.current?.dismiss()}>
//           <Text>Cancel</Text>
//         </StyledButton>
//       </StyledContainer>
//     </BottomSheetModal>
//   );
// });
//
// const StyledContainer = styled.View`
//   flex: 1;
//   padding: 16px;
//   justify-content: center;
// `;
//
// const StyledButton = styled.TouchableOpacity`
//   padding: 15px;
//   border-right: 5px;
//   background-color: #f1f1f1;
//   margin-vertical: 5px;
//   align-items: center;
// `;

import {forwardRef, useCallback, useMemo} from 'react';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';
import {Text} from '@gluestack-ui/themed';
import {useFetchDelChattingRoom} from '~/features/chatting/chattingBottomSheet/model/useFetchDelChattingRoom.ts';

interface Props {
  snapPoints?: string[];
  index?: number;
  closeBottomSheet: () => void;
  chatRoomId: string;
}

export const ChattingBottomSheet = forwardRef<BottomSheetModalMethods, Props>(
  ({index = 0, snapPoints = ['25%'], chatRoomId, closeBottomSheet}, ref) => {
    const {deleteChattingRoom} = useFetchDelChattingRoom();

    const resultSnapPoints = useMemo(() => snapPoints, []);
    const renderBackdrop = useCallback(
      (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />,
      [],
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={index}
        snapPoints={resultSnapPoints}
        backdropComponent={renderBackdrop}
        onDismiss={closeBottomSheet}>
        <StyledContainer>
          <StyledButton onPress={() => deleteChattingRoom(chatRoomId)}>
            <Text>채팅방 나가기</Text>
          </StyledButton>
          <StyledButton onPress={closeBottomSheet}>
            <Text>Cancel</Text>
          </StyledButton>
        </StyledContainer>
      </BottomSheetModal>
    );
  },
);

const StyledContainer = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: center;
`;

const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  border-right: 5px;
  background-color: #f1f1f1;
  margin-vertical: 5px;
  align-items: center;
`;
