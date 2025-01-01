export {transformDateTime, transformDate, transformDateAgo} from '~/shared/utils/lib/transformDateTime.ts';
export {formatTimeDifference} from '~/shared/utils/lib/formatTimeDifference.ts';
export {chatFormatTimeDifference} from '~/shared/utils/lib/chatFormatTimeDifference.ts';
export {DynamicObjectHandler} from './lib/dynamicAddObject';
export {sortDate} from './lib/sortDate';
export {validatePasswordMessage} from './lib/validate.ts';

// 유저정보 마스킹
export {maskName} from './lib/maskName.ts';

// 키보드 높이 관련 가져오는 Hook
export {useKeyboardHeight} from './lib/useKeyboardHeight.ts';
export {useAnimatedKeyboardHeight} from './lib/useAnimatedKeyboardHeight.ts';

// user 의 알림여부를 묻는 함수
export {requestUserPermission} from '../deviceInfo/lib/requestUserPermission.ts';

// 화면방향을 고정하는 Hook
export {useHorizonOrientationLock} from './lib/useOrientationLock.ts';

// 로컬 이미지 정보를 추출하는 함수
export {defaultImageInfo} from './lib/defaultImageInfo.ts';

// 이미지 크기를 줄이는 함수
export type {CommonImageInfo} from './lib/optimizeImage.ts';
export {optimizeFullSizeImage, optimizeProfileImage} from './lib/optimizeImage.ts';
