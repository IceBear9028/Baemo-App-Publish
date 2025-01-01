import {Input, InputField, Text, VStack} from '@gluestack-ui/themed';

interface FormInputProps {
  title: string;
  value: string;
  onChangeText: (input: string) => void;
  placeholder: string;
}

export const FormInput = ({title, value, onChangeText, placeholder}: FormInputProps) => {
  const isDefaultPlaceholder = placeholder === '실명을 기입해주세요.' || placeholder === '나를 나타낼 수 있는 소개글을 작성해주세요.';
  const placeholderTextColor = isDefaultPlaceholder ? '#aaa' : '#000';
  return (
    <VStack space="xs">
      <Text color="$textLight800" lineHeight="$xs" size={'sm'}>
        {title}
      </Text>
      <Input>
        <InputField
          value={value}
          onChangeText={onChangeText}
          type="text"
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
        />
      </Input>
    </VStack>
  );
};
