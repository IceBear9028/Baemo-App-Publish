import {Alert} from 'react-native';
import {fetchDelChattingRoom, ReqDelChattingRoom} from '../api/fetchDelChattingRoom.ts';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {chattingRoomListQueryKey} from '~/features/chatting/chattingRoomList/model/useFetchChattingRoomList.ts';

export function useFetchDelChattingRoom() {
  const queryClient = useQueryClient();
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchDelChattingRoom,
    onSuccess: () => {
      Alert.alert('채팅방 나가기', '채팅방에서 나갔습니다.', [
        {
          text: '확인',
          onPress: () => {
            queryClient.invalidateQueries({queryKey: [...chattingRoomListQueryKey]});
          },
        },
      ]);
    },
    onError: () => {
      Alert.alert('삭제 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
    },
  });

  function deleteChattingRoom(roomId: string) {
    if (roomId) {
      Alert.alert('채팅방 나가기', '채팅방에서 나가시겠습니까?', [
        {text: '취소'},
        {
          text: '확인',
          style: 'destructive',
          onPress: () => {
            const req: ReqDelChattingRoom = {
              roomId,
            };
            mutate(req);
          },
        },
      ]);
    } else {
      Alert.alert('채팅방 삭제', '문제가 발생했습니다.', [{text: '확인'}]);
    }
  }

  return {
    isPendingDel: isPending,
    deleteChattingRoom,
  };
}
