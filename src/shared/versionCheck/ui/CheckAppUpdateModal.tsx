import styled from 'styled-components/native';
import {Linking, Platform} from 'react-native';
import {useAppVersionCheck} from '~/shared/versionCheck';
import {
  Button,
  ButtonText,
  Heading,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from '@gluestack-ui/themed';

export const CheckAppUpdateModal = () => {
  const {isCheckUpdate} = useAppVersionCheck();

  function moveToStoreEvent() {
    if (Platform.OS === 'android') {
      Linking.openURL('https://play.google.com/store/apps/details?id=com.headofftil.baemo');
    } else {
      Linking.openURL(
        'https://apps.apple.com/kr/app/%EB%B0%B0%EB%AA%A8-%EB%B0%B0%EB%93%9C%EB%AF%BC%ED%84%B4%EC%9D%98-%EB%AA%A8%EB%93%A0-%EA%B2%83/id6664070567',
      );
    }
  }

  return (
    <Modal isOpen={isCheckUpdate} onClose={() => {}} size={'sm'}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="sm">새로운 업데이트 알림</Heading>
        </ModalHeader>
        <ModalBody>
          <StyledContainer>
            <Text size="sm">{'새로운 버전이 업데이트 되었어요!'}</Text>
          </StyledContainer>
        </ModalBody>
        <ModalFooter>
          <StyledButtonContainer>
            <Button
              onPress={() => {
                moveToStoreEvent();
              }}
              size="sm">
              <ButtonText>스토어로 이동하기</ButtonText>
            </Button>
          </StyledButtonContainer>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const StyledContainer = styled.View`
  padding-top: 12px;
  gap: 6px;
`;

const StyledButtonContainer = styled.View`
  flex: 1;
`;
