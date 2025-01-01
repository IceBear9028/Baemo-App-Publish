import {useEffect, useState} from 'react';
import CodePush from 'react-native-code-push';

export function useCheckCodePush() {
  const [isRecent, setRecent] = useState<boolean>();
  const [downloadProgress, setDownloadProgress] = useState(0);

  const checkUpdate = async () => {
    try {
      const update = await CodePush.checkForUpdate();
      console.log('업데이트 확인:', update);

      if (!update) {
        setRecent(false); // update가 없을 경우 false 반환
        return;
      }

      setRecent(true); // 업데이트가 있다면 true로 설정

      const newPackage = await update.download(({receivedBytes, totalBytes}) => {
        setDownloadProgress((receivedBytes / totalBytes) * 100);
      });

      await newPackage.install(CodePush.InstallMode.IMMEDIATE);

      setRecent(false); // 설치 완료 후 false로 설정
      CodePush.notifyAppReady();
      CodePush.restartApp();
    } catch (error) {
      console.error('업데이트 체크 중 에러 발생:', error);
      setRecent(false); // 에러 발생 시 false로 설정
    }
  };

  useEffect(() => {
    checkUpdate();
  }, []);

  return {
    downloadProgress,
    isRecent,
  };
}
