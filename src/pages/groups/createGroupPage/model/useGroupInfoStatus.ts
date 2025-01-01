import {useEffect, useState} from 'react';
import {useBackgroundImageStore} from '~/shared/selectBackgroundImage';
import {ProfileImageInfo, useProfileImageStore} from '~/shared/selectProfileImage';
import {CommonImageInfo} from '~/shared/utils';

interface MetaInfo {
  name: string;
  statusText: string;
  region: string;
  intro: string;
}

export interface GroupInfo extends MetaInfo {
  profile: ProfileImageInfo;
  background: CommonImageInfo;
}

const INIT_META = {name: '', statusText: '', region: '', intro: ''};

export function useGroupInfoStatus() {
  const [isValid, setValid] = useState<boolean>(false);
  const [infoMetaStatus, setInfoStatus] = useState<MetaInfo>(INIT_META);
  const profileImage = useProfileImageStore(store => store.profileImage);
  const backgroundImage = useBackgroundImageStore(store => store.background);
  const infoStatus: GroupInfo = {
    ...infoMetaStatus,
    profile: profileImage,
    background: backgroundImage,
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

  useEffect(() => {
    setValid(!!infoMetaStatus.name && !!infoMetaStatus.region && infoMetaStatus.intro.length >= 10);
  }, [isValid, infoMetaStatus]);

  return {
    infoStatus,
    isValid,
    changeName,
    changeIntro,
    changeStatusText,
    changeRegion,
  };
}
