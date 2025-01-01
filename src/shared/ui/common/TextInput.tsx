import {Input, InputField, Text, VStack} from '@gluestack-ui/themed';

interface TextInputProps {
  title: string;
  value: string;
  onChangeText: (input: string) => void;
  errorMessage: string;
}

export const TextInput = ({title, value, onChangeText, errorMessage}: TextInputProps) => {
  return (
    <VStack space="xs">
      <Text color="$textLight800" lineHeight="$xs" size={'sm'}>
        {title}
      </Text>
      <Input>
        <InputField value={value} onChangeText={onChangeText} type="text" />
      </Input>
      {errorMessage && (
        <Text size={'xs'} color={'$error400'}>
          {errorMessage}
        </Text>
      )}
    </VStack>
  );
};
