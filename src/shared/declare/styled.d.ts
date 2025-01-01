// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    blackColor: string;
    whiteColor: string;
    grayColor: string;
    blueColor: string;
    yellowColor: string;
    orangeColor: string;
    greenColor: string;
    redColor: string;
  }
}
