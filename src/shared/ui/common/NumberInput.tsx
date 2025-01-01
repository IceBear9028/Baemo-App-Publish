import {useState} from 'react';
import {Input, InputField, Text, VStack} from '@gluestack-ui/themed';

interface NumberInputProps {
  name?: string;
  value?: number | string;
  size?: 'md' | 'sm' | 'lg';
  placeholder?: string;
  onChangeNumber: (input: string) => void;
  onFocus?: () => void;
  errorMessage?: string;
}

export const NumberInput = ({name = '숫자입력', placeholder, onChangeNumber, onFocus, errorMessage, value, size}: NumberInputProps) => {
  const [isEditable, setIsEditable] = useState(true);
  const handleSelectionChange = () => {
    // 선택을 방지하기 위해 편집 가능 상태를 일시적으로 비활성화
    setIsEditable(false);
    setTimeout(() => setIsEditable(true), 0); // 잠시 후 다시 활성화
  };

  const handleTextChange = (input: string) => {
    const numericInput = input.replace(/[^0-9]/g, ''); // 숫자만 허용
    onChangeNumber(numericInput);
  };
  return (
    <VStack space="xs">
      {name && (
        <Text color="$textLight800" lineHeight="$xs" size={'sm'}>
          {name}
        </Text>
      )}
      <Input size={size}>
        <InputField
          contextMenuHidden={true} // 컨텍스트 메뉴 숨김
          editable={isEditable} // 편집 가능 상태 설정
          maxLength={10}
          placeholder={placeholder}
          keyboardType="number-pad"
          onChangeText={handleTextChange}
          onFocus={onFocus}
          value={value ? String(value) : undefined}
        />
      </Input>
      {errorMessage && (
        <Text size={'xs'} color={'$error400'}>
          {errorMessage}
        </Text>
      )}
    </VStack>
  );
};
