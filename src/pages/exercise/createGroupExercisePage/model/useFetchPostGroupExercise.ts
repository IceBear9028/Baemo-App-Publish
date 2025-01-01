import {Alert} from 'react-native';
import {useMainNavigate} from '~/shared/route';
import {Groups} from '~/shared/mapper/groups';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useProfileImageStore} from '~/shared/selectProfileImage';
import {fetchPostGroupExercise} from '../api/fetchPostGroupExercise.ts';
import {PostExerciseInfoStatus} from '../model/useGroupExerciseStatus.ts';
import {groupExerciseListQueryKey} from '~/features/exercise/groupExerciseList';
import {LocationDetail} from '~/pages/location/ui/LocationSearch.tsx';

interface ReqCreateDto {
  clubId: number;
  title: string;
  description: string;
  participantLimit: number;
  guestLimit: number;
  location: string;
  locationDetail: LocationDetail;
  exerciseStartTime: string;
  exerciseEndTime: string;
}

export interface ValidCreateDTO extends PostExerciseInfoStatus {
  startTime: Date;
  endTime: Date;
  group: Groups;
}

export function useFetchPostGroupExercise() {
  const {navigateBack} = useMainNavigate();
  const queryClient = useQueryClient();
  const {profileImage, resetProfileStore, getOptimizeProfileImage} = useProfileImageStore();
  const {isError, isPending, mutate} = useMutation({
    mutationFn: fetchPostGroupExercise,
    onSuccess: () => {
      navigateBack();
      resetProfileStore();
      queryClient.invalidateQueries({queryKey: [...groupExerciseListQueryKey]});
      Alert.alert('모임 운동 생성', '모임 운동을 생성 했습니다.', [{text: '확인'}]);
    },
    onError: error => {
      if (error.response?.data.payload) {
        Alert.alert('모임 운동 실패', error.response?.data.payload as string, [{text: '확인'}]);
      } else {
        Alert.alert('모임 운동 실패', '서버에 문제가 발생했습니다.', [{text: '확인'}]);
      }
    },
  });

  async function postExercise(info: ValidCreateDTO) {
    const createDto: ReqCreateDto = {
      clubId: info.group.groupsId,
      title: info.name,
      description: info.intro,
      participantLimit: Number(info.headCount),
      guestLimit: Number(info.guestHeadCount),
      location: info.location,
      locationDetail: info.locationDetail,
      exerciseStartTime: info.startTime.toISOString(),
      exerciseEndTime: info.endTime.toISOString(),
    };

    const formData = new FormData();
    const optimizeProfile = await getOptimizeProfileImage();
    formData.append('createDTO', {string: JSON.stringify(createDto), type: 'application/json'});

    if (optimizeProfile) {
      formData.append('thumbnail', {
        uri: optimizeProfile.uri,
        type: profileImage.type,
        name: profileImage.fileName,
      });
    } else {
      formData.append('thumbnail', null);
    }
    mutate(formData);
  }

  return {
    isErrorExercise: isError,
    isPendingExercise: isPending,
    postExercise,
  };
}
