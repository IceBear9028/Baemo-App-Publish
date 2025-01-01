import {useCheckCodePush} from '~/widgets/codepush/model/useCheckCodePush.ts';
import {
  Button,
  CloseIcon,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  ProgressFilledTrack,
  Text,
} from '@gluestack-ui/themed';
import styled from 'styled-components/native';

export const CheckCodePushModal = () => {
  const {isRecent, downloadProgress} = useCheckCodePush();
  return (
    <Modal isOpen={isRecent} onClose={() => {}} size={'sm'}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="sm">업데이트 중...</Heading>
        </ModalHeader>
        <ModalBody>
          <StyledContainer>
            <StyledTextContainer>
              <Text size="xs">{'최신버전으로 업데이트 중이에요!'}</Text>
              <Text size="xs">{`${Math.round(downloadProgress)}%`}</Text>
            </StyledTextContainer>
            <Progress value={downloadProgress} h="$1">
              <ProgressFilledTrack h="$1" />
            </Progress>
          </StyledContainer>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const StyledContainer = styled.View`
  padding-top: 8px;
  padding-bottom: 16px;
  gap: 6px;
`;

const StyledTextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
