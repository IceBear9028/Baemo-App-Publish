export type {FilterOptionType} from './common/Filter';

/** 추가사항
 * 사실 같은 레이어 내의 슬라이스끼리 서로 공유하는 것은 FSD 규칙에 위배.
 * 근데 이 규칙을 지키면 shared 레이어보다 아래 단계의 레이어가 필요하여 어쩔수 없이 위반함.
 */

// 1. 앱 전체에서 공통으로 사용하는 UI (common)
export {HeadCountBadge} from './common/HeadCountBadge';
export {FeatureDivider} from './common/FeatureDivider';
export {RectThumbnail} from './common/RectThumbnail';
export {RegularDayBadge} from './common/RegularDayBadge';
export {Filter, FilterOption, FilterContainer} from './common/Filter';
export {BackButton} from './common/BackButton';
export {ImageList} from './common/ImageList';
export {HeadingTitle} from './common/HeadingTitle';
export {ScreenLayout} from './common/ScreenLayout';
export {MoreButton} from './common/MoreButton';
export {HeaderSettingButton, HeaderNotificationButton, HeaderSearchButton} from './common/HeaderButtont';
export {FabButton, FabButtonContainer} from './common/FabButton';
export {CategoryButton} from './common/CategoryButton';
export {LoadingPageSpinner, LoadingSpinner} from './common/LoadingSpinner';
export {SelectDateInput} from './common/SelectDateInput';
export {SelectTimeInput} from './common/SelectTimeInput';
export {SelectDatetimeInput} from './common/SelectDatetimeInput';
export {SelectTimeRangeInput} from './common/SelectTimeRangeInput.tsx';
export {StartEndDatetimeInput} from './common/StartEndDatetimeInput';
export {TextInput} from './common/TextInput';
export {NumberInput} from './common/NumberInput';
export {PlayerLevelBadge} from './common/PlayerLevelBadge';
export {CustomAvatar} from './common/CustomAvatar';

// 2. 앱 전체에서 exercise 에서 사용하는 UI (exercise);
export {ExerciseStatusBadge} from './exercise/ExerciseStatusBadge';
export {ExerciseTypeBadge} from './exercise/ExerciseTypeBadge';
export {GameStatusBadge} from './game/GameStatusBadge.tsx';
export {ExerciseMemberStatusBadge} from './exercise/ExerciseMemberStatusBadge.tsx';

// 3. 앱 전체에서 Group 에서 사용하는 UI (group)
export {GroupMemberStatusBadge} from './gorups/GroupMemberStatusBadge';
export {GroupsBackground} from './gorups/GroupsBackground';
export {GroupsThumbnail} from './gorups/GroupsThumbnail';

// 4. 앱 전체에서 Community 에서 사용하는 UI (community)
export {ProfileInfoCard} from './community/profileInfoCard';
export {ArticleLikeButton} from './community/articleLikeButton';
export {ArticleStatusBadge} from './community/articleStatusBadge';
export {ArticleCommentsButton} from './community/articleCommentsButton';

// 5. 앱 전체에서 Chatting 에서 사용하는 UI (chatting)
export {CheckButton} from './chatting/CheckButton.tsx';
export {CheckedButton} from './chatting/CheckedButton.tsx';
export {Hamburger} from './chatting/Hamburger.tsx';
export {AddButton} from './chatting/AddButton.tsx';
