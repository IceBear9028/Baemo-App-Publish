// AddressOverlay.tsx
import React from 'react';
import {View, StyleSheet, StatusBar, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {Overlay} from 'react-native-elements';
import Postcode from '@actbase/react-daum-postcode';
import {SafeAreaView} from '@gluestack-ui/themed';
import {BackButtonIcon} from '~/pages/login/mainLoginPage/ui/iconButton.tsx';
import {KakaoApi} from '~/features/location/api/kakao-api.ts';

interface LocationOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectAddress: (address: any) => void;
}

export interface LocationDetail {
  address: string;
  locationCode: string;
  latitude: number;
  longitude: number;
}

export interface LocationResponse {
  location: string | null;
  locationDetail: LocationDetail;
}

export const LocationSearch: React.FC<LocationOverlayProps> = ({isVisible, onClose, onSelectAddress}) => {
  const kakaoApi = KakaoApi();

  const getAddressData = (data: any) => {
    let addr = data.roadAddress ? data.roadAddress : data.address ? data.address : 'addr error';

    // 좌표 변환 Kakao API 호출
    kakaoApi
      .convertAddrToXY(addr)
      .then(response => {
        console.log(`Kakao API SUCCESS ::: ${response.x} / ${response.y}`);
        const locationResponse: LocationResponse = {
          location: data.buildingName ? data.buildingName : addr,
          locationDetail: {
            address: addr,
            locationCode: data.bcode ? data.bcode : '',
            latitude: Number(response.y), // y 가 위도
            longitude: Number(response.x), // x 가 경도
          },
        };
        onSelectAddress(locationResponse);
        onClose(); // 주소 선택 후 오버레이 닫기
      })
      .catch(err => console.log(`Kakao API Error ::: ${err}`));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.keyboardAvoid} behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
        <Overlay
          isVisible={isVisible}
          onBackdropPress={onClose}
          overlayStyle={[
            styles.overlay,
            {
              width: '95%', // 조금 줄여서 SafeArea 반영
              height: '85%',
              borderRadius: 10,
            },
          ]}>
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            <View style={styles.content}>
              <BackButtonIcon onPress={onClose} />
              <Postcode
                style={styles.postcode}
                jsOptions={{
                  animation: true,
                  shorthand: false,
                  theme: {
                    outlineColor: '#F6F6F6',
                    bgColor: '#F6F6F6',
                    textColor: '#404040',
                  },
                }}
                onSelected={data => getAddressData(data)}
                onError={error => {
                  console.error('Postcode error: ', error);
                }}
              />
            </View>
          </ScrollView>
        </Overlay>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // StatusBar 크기 고려
  },
  overlay: {
    padding: 0,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  postcode: {
    flex: 1,
    zIndex: 999,
  },
});
