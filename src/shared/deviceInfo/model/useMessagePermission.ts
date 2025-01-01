import {useEffect} from 'react';
import {useFetchDeviceInfo} from '~/shared/deviceInfo/model/useFetchDeviceInfo.ts';
import {useMessagePermissionStore} from '~/shared/deviceInfo/model/useMessagePermissionInfoStore.ts';

/** ### useMessagePermission()
 * #### 사용용도
 * ```
 * - 로그인 이후, 기기정보를 서버에 전달
 * - 기기정보 이용해서 알람서비스 제공
 * ```
 * #### 작동원리
 * 1. 기기정보를 서버에 전달한 이력이 있는지 확인
 *    - `useMessagePermissionStore()` : 서버에 기기정보를 전송한 이력을 저장하는 zustand
 * 2. 전달한 이력을 발견하면 그대로 랜더링
 * 3. 전달한 이력이 없다면 `useFetchDeviceInfo()` 의 `fetchMessagePermission` 메소드 실행
 *    - `fetchMessagePermission` : 기기정보를 서버에 전송하는 비동기 함수
 * 4. 서버에 기기정보 전달 성공 시, `useMessagePermissionStore()` 이용하여 기기정보 전송이력을 저장
 * #### 사용방법
 * - 컴포넌트의 Root 위치에 해당 Hook 을 실행
 * ```typescript
 * const Component = () => {
 *    useMessagePermission()
 *    return(
 *      <Container>
 *          ...
 *      <Container>
 *    )
 * }
 * ```
 */
export function useMessagePermission() {
  const {fetchMessagePermission} = useFetchDeviceInfo();
  const {permissionInfo, initialPermission} = useMessagePermissionStore();

  useEffect(() => {
    initialPermission();
    fetchMessagePermission();
  }, [permissionInfo.permission]);
}
