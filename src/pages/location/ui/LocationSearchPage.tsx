// import Postcode from '@actbase/react-daum-postcode';
// import {View} from 'react-native';
// import {RootMainStackParamList, useMainNavigate} from '~/shared/route';
// import {useGroupExerciseStatus} from '~/pages/exercise/createGroupExercisePage/model/useGroupExerciseStatus.ts';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
//
// type LocationSearchPageProps = NativeStackScreenProps<RootMainStackParamList, 'locationSearchPage'>;
//
// export const LocationSearchPage = ({route}: LocationSearchPageProps) => {
//   const navigate = useMainNavigate();
//   const fromPageName = route.params.fromPage;
//   const initGroup = route.params.initGroup;
//   const {changeLocation, changeLocationCode} = useGroupExerciseStatus(initGroup);
//
//   const getAddressData = (data: any) => {
//     let code = data.bcode ? data.bcode : '';
//     let addr = data.roadAddress ? data.roadAddress : data.address ? data.address : 'error';
//     console.log(`From Page ::: ${fromPageName}`);
//     console.log(`code: ${code}, addr: ${addr}`);
//     if (fromPageName === 'createGroupExercisePage') {
//       changeLocation(addr);
//       changeLocationCode(code);
//     } else if (fromPageName === 'createThunderExercisePage') {
//       // setLocation(addr);
//       // setLocationCode(code);
//     }
//     navigate.navigateBack();
//   };
//
//   return (
//     <View style={{flex: 1}}>
//       <Postcode
//         style={{flex: 1, width: '100%', zIndex: 999}}
//         jsOptions={{
//           animation: true, // 애니메이션 노출
//           shorthand: false, // 서울 -> 서울특별시 와 같이 full name 사용
//           theme: {
//             outlineColor: '#10B981',
//             bgColor: '#10B981',
//             textColor: '#10B981',
//           },
//         }}
//         onSelected={data => getAddressData(data)}
//         onError={function (error: unknown): void {
//           throw new Error(`Function not implemented. ${error}`);
//         }}
//       />
//     </View>
//   );
// };
