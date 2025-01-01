import VersionCheck from 'react-native-version-check';
import {useEffect, useState} from 'react';

export function useAppVersionCheck() {
  const [isCheckUpdate, setCheckUpdate] = useState<boolean>();
  const fetchAppVersionCheck = async () => {
    console.log('첫진입 시작');

    //기기에 설치되 있는 버전
    let CurrentVersion = VersionCheck.getCurrentVersion();
    let LatestVersion = await VersionCheck.getLatestVersion();

    console.log('현재버전', CurrentVersion);
    console.log('마지막버전', LatestVersion);

    //기기에 설치되있는 버전과 앱에 올려져있는 최신버전을 비교
    await VersionCheck.needUpdate({
      currentVersion: CurrentVersion,
      latestVersion: LatestVersion,
    }).then((res: any) => {
      setCheckUpdate(res.isNeeded);
    });
  };

  useEffect(() => {
    fetchAppVersionCheck();
  }, []);

  return {
    isCheckUpdate,
  };
}
