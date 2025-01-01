import {Dimensions} from 'react-native';
import WebView from 'react-native-webview';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootLoginStackParamList} from '~/shared/route';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface TermsOfServiceWebViewProps extends NativeStackScreenProps<RootLoginStackParamList, 'termsOfServiceWebViewPage'> {}
export const TermsOfServiceWebView = ({route}: TermsOfServiceWebViewProps) => {
  return (
    <StyledContainer>
      <WebView style={{flex: 1, width: windowWidth, height: windowHeight}} source={{uri: route.params.url}} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;
