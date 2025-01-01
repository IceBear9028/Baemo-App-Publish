import styled from 'styled-components/native';
import {Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel, CheckIcon, FormControl, Text} from '@gluestack-ui/themed';
import ArrowIcon from '~/shared/images/svg/game_arrow.svg';
import {useLoginNavigate} from '~/shared/route';

interface ServiceCheckBoxProps {
  label: string;
  content: string;
  isChecked: boolean;
  onToggle: () => void;
}

const option1 = 'https://www.baemo.co.kr/term';
const option2 = 'https://www.baemo.co.kr/policy';

export const TermsOfServiceCheckBox = ({label, content, isChecked, onToggle}: ServiceCheckBoxProps) => {
  const {navigateTermsOfServiceWebView} = useLoginNavigate();
  const showWebView = () => {
    switch (label) {
      case '1':
        return option1;
      default:
        return option2;
    }
  };
  return (
    <StyledCheckBoxContainer>
      <Checkbox
        aria-label="동의받기"
        value={label}
        size="lg"
        accessibilityLabel={'serviceCheckBox'}
        onPress={onToggle}
        isChecked={isChecked}>
        <CheckboxIndicator>
          <CheckboxIcon as={CheckIcon} />
        </CheckboxIndicator>
      </Checkbox>
      <Text size={'md'}>{content}</Text>
      {label === '0' ? null : (
        <StyledArrowButton onPress={() => navigateTermsOfServiceWebView(showWebView())}>
          <ArrowIcon style={{width: 24, height: 24}} />
        </StyledArrowButton>
      )}
    </StyledCheckBoxContainer>
  );
};
// navigateTermsOfServiceWebView(showWebView)

const StyledCheckBoxContainer = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 8px;
`;

const StyledArrowButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
