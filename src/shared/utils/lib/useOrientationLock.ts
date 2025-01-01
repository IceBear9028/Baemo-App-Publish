import {useEffect} from 'react';
import Orientation, {OrientationType} from 'react-native-orientation-locker';

/** ### useHorizonOrientationLock()
 * #### 사용용도
 * - 특정 페이지에만 가로모드를 적용할 수 있는 Hook
 * #### 사용방법
 * - 가로모드 적용하고 싶은 페이지에서 Hook 을 실행
 * ```typescript
 * export const HorizonPage = () => {
 *   useHorizonOrientationLock();
 *   return (
 *     <StyledContainer>
 *       ...
 *     </StyledContainer>
 *   );
 * };
 * ```
 */
export function useHorizonOrientationLock() {
  useEffect(() => {
    // 페이지가 로드될 때 가로 모드로 변경
    Orientation.lockToLandscapeLeft();
    Orientation.addOrientationListener(onOrientationDidChange);

    return () => {
      Orientation.unlockAllOrientations();
      Orientation.removeOrientationListener(onOrientationDidChange);
      Orientation.lockToPortrait();
    };
  }, []);

  const onOrientationDidChange = (orientation: OrientationType) => {
    if (orientation === 'PORTRAIT') {
      Orientation.lockToLandscapeLeft();
    }
  };
}
