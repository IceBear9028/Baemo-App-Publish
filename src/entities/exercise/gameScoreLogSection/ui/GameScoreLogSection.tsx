// import {LineChart} from 'react-native-chart-kit';
// import {Dimensions} from 'react-native';
// const screenWidth = Dimensions.get('window').width;
//
// export const GameScoreLogSection = () => {
//   const data = {
//     datasets: [
//       {
//         data: [
//           17, 45, 34, 54, 32, 43, 20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43, 43, 17, 45, 34, 54, 32, 43, 20, 45, 28, 80, 99, 43, 20,
//           45, 28, 80, 99, 43, 43,
//         ],
//         color: (opacity = 1) => `rgba(243, 163, 175, ${opacity})`, // optional
//         strokeWidth: 2, // optional
//       },
//       {
//         data: [
//           17, 45, 34, 54, 32, 43, 20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43, 43, 17, 45, 34, 54, 32, 43, 20, 45, 28, 80, 99, 43, 20,
//           45, 28, 80, 99, 43, 43,
//         ],
//         color: (opacity = 1) => `rgba(60, 80, 90, ${opacity})`, // optional
//         strokeWidth: 2, // optional
//       },
//     ],
//   };
//
//   return (
//     <LineChart
//       data={data}
//       width={screenWidth}
//       height={220}
//       chartConfig={{
//         backgroundColor: '#ffffff',
//         backgroundGradientFrom: '#ffffff',
//         backgroundGradientTo: '#ffffff',
//         decimalPlaces: 2, // optional, defaults to 2dp
//         color: (opacity = 1) => '#c7c7c7',
//         labelColor: (opacity = 1) => `rgba(140, 140, 140, ${opacity})`,
//         style: {
//           borderRadius: 16,
//         },
//         propsForDots: {
//           r: '6',
//           strokeWidth: '2',
//           stroke: '#dcdcdc',
//         },
//       }}
//       style={{
//         paddingTop: 40,
//         paddingBottom: 40,
//       }}
//     />
//   );
// };
