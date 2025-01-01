import {useState} from 'react';
import {MyFriendList} from '~/shared/mapper/chatting';

export function useSelectFriend() {
  const [selectedFriend, setSelectedFriend] = useState<MyFriendList | null>(null);
  const selectFriend = (friend: MyFriendList) => {
    setSelectedFriend(prev => {
      if (prev?.userId === friend.userId) {
        return null;
      }
      return friend;
    });
  };
  const deselectFriend = () => {
    setSelectedFriend(null);
  };

  return {selectedFriend, selectFriend, deselectFriend};
}
