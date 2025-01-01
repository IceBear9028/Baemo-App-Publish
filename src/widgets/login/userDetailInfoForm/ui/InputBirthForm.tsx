import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';
import {SelectDateInput} from '~/shared/ui';
import styled from 'styled-components/native';
import {Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel, CheckIcon} from '@gluestack-ui/themed';

export const InputBirthForm = () => {
  const {isNotCheckBirth, setBirth, setCheckBirth} = useSignUpUserInfoStore(store => ({
    isNotCheckBirth: store.isNotCheckBirth,
    setBirth: store.setBirth,
    setCheckBirth: store.setCheckBirth,
  }));

  function selectDate(inputDate: Date) {
    setBirth(inputDate);
  }

  function onCheckBirth(isNotCheckBirth: boolean) {
    setCheckBirth(isNotCheckBirth);
  }

  return (
    <StyledContainer>
      <SelectDateInput title={'생일'} onSelectDate={selectDate} isDisabled={isNotCheckBirth} />
      <Checkbox
        size="md"
        aria-label={'팀 지정게임 여부'}
        value={'팀 지정'}
        isChecked={isNotCheckBirth}
        onChange={value => onCheckBirth(value)}>
        <CheckboxIndicator mr="$2">
          <CheckboxIcon as={CheckIcon} />
        </CheckboxIndicator>
        <CheckboxLabel>생일을 알리고 싶지 않아요.</CheckboxLabel>
      </Checkbox>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  gap: 16px;
`;
