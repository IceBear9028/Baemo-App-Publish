import styled from 'styled-components/native';
import {Text} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import {TermsOfServiceCheckBox} from '~/entities/login/TermsOfServiceCheckBox';
import {useSignUpUserInfoStore} from '~/features/login/signUpUserInfo';

export const InputTermsOfServiceForm = () => {
  const setServiceCheck = useSignUpUserInfoStore(store => store.setServiceCheck);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    option1: false,
    option2: false,
  });

  const handleToggleAll = () => {
    setIsAllChecked(prev => !prev);
    setCheckboxStates(() => ({
      option1: !isAllChecked,
      option2: !isAllChecked,
    }));
  };

  const handleToggleOption = (option: keyof typeof checkboxStates) => {
    const newState = !checkboxStates[option];
    const newStates = {...checkboxStates, [option]: newState};

    setCheckboxStates(newStates);
  };

  useEffect(() => {
    const allChecked = checkboxStates.option1 && checkboxStates.option2;
    setIsAllChecked(allChecked);
    setServiceCheck(allChecked);
  }, [checkboxStates.option1, checkboxStates.option2]);

  return (
    <StyledContainer>
      <Text color="$text700" size="sm">
        서비스이용약관 동의
      </Text>
      <StyledTermsContainer>
        <TermsOfServiceCheckBox label={'0'} content={'전체 동의'} isChecked={isAllChecked} onToggle={handleToggleAll} />
        <TermsOfServiceCheckBox
          label={'1'}
          content={'(필수) BAEMO 이용약관 동의'}
          isChecked={checkboxStates.option1}
          onToggle={() => handleToggleOption('option1')}
        />
        <TermsOfServiceCheckBox
          label={'2'}
          content={'(필수) 개인정보 수집 동의'}
          isChecked={checkboxStates.option2}
          onToggle={() => handleToggleOption('option2')}
        />
      </StyledTermsContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  gap: 12px;
`;

const StyledTermsContainer = styled.View`
  gap: 16px;
`;
const Line = styled.View`
  flex: 1;
  height: 1px;
  background-color: #d6d3d1;
`;
