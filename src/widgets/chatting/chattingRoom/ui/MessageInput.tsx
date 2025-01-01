import styled from 'styled-components/native';
// import {AddButton} from '~/shared/ui';
import {useState} from 'react';
import {SafeAreaView} from '@gluestack-ui/themed';
import {Platform} from 'react-native';

interface MessageInputProps {
  onSend: (message: string) => void;
  isEditable: boolean;
}
export const MessageInput = ({onSend, isEditable}: MessageInputProps) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = () => {
    if (inputMessage.trim() !== '') {
      onSend(inputMessage);
      setInputMessage('');
    }
  };
  return (
    <StyledContainer>
      <InputContainer>
        <Input
          value={inputMessage}
          onChangeText={setInputMessage}
          onSubmitEditing={handleSend}
          placeholder={isEditable ? 'message...' : '대화가 불가능한 상대입니다'}
          placeholderTextColor="gray"
          editable={isEditable}
        />
        {isEditable && (
          <SendButton onPress={handleSend}>
            <ButtonText>보내기</ButtonText>
          </SendButton>
        )}
      </InputContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  border-top-width: 1px;
  border-top-color: #d4d4d4;
  padding: 15px 15px 20px 15px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 15px;
  flex: 1;
`;
const SendButton = styled.TouchableOpacity`
  background-color: #10b981;
  border-radius: 4px;
  padding: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 12px;
`;

const Input = styled.TextInput`
  flex: 1;
  padding: 7px;
  background-color: #f5f5f5;
  border-radius: 4px;
  color: #181818;
`;
