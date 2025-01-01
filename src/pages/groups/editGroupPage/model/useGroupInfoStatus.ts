import {useEffect, useState} from 'react';
import {GroupsIntro} from '~/shared/mapper/groups';
import {useGroupDetailInfoStore} from '~/features/groups/detailGroupsIntroduction';
import {ProfileImageInfo, useProfileImageStore} from '~/shared/selectProfileImage';
import {useBackgroundImageStore} from '~/shared/selectBackgroundImage';
import {CommonImageInfo} from '~/shared/utils';

interface MetaInfo {
  name: string;
  statusText: string;
  region: string;
  intro: string;
}

export interface GroupInfo extends MetaInfo {
  id: number;
  profile: ProfileImageInfo;
  background: CommonImageInfo;
}

export function useGroupInfoStatus(groupsId: number, {groupsName, location, groupsDescription, gatheringThumbnail}: GroupsIntro) {
  const prevGroupInfo = useGroupDetailInfoStore(store => store.info);
  const [isValid, setValid] = useState<boolean>(false);
  const [infoMetaStatus, setInfoStatus] = useState<MetaInfo>({
    name: groupsName,
    statusText: groupsDescription,
    region: location,
    intro: prevGroupInfo.description,
  });
  const {profileImage, setProfile} = useProfileImageStore();
  const {background, setBackground} = useBackgroundImageStore();
  const infoStatus: GroupInfo = {
    ...infoMetaStatus,
    id: groupsId,
    profile: profileImage,
    background: background,
  };

  function changeName(input: string) {
    setInfoStatus(prev => ({...prev, name: input}));
  }
  function changeStatusText(input: string) {
    setInfoStatus(prev => ({...prev, statusText: input}));
  }
  function changeRegion(input: string) {
    setInfoStatus(prev => ({...prev, region: input}));
  }
  function changeIntro(input: string) {
    setInfoStatus(prev => ({...prev, intro: input}));
  }

  // 모임정보 작성 모임 정보에 대한 유효성검증 수행
  useEffect(() => {
    setValid(!!infoMetaStatus.name && !!infoMetaStatus.region && infoMetaStatus.intro.length >= 10);
  }, [isValid, infoMetaStatus]);

  // 페이지 처음 랜더링 시 적용
  useEffect(() => {
    setProfile({uri: gatheringThumbnail});
    setBackground({uri: prevGroupInfo.background});
  }, []);

  return {
    infoStatus,
    isValid,
    changeName,
    changeIntro,
    changeStatusText,
    changeRegion,
  };
}
