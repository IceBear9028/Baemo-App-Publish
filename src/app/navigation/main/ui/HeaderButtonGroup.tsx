import styled from 'styled-components/native';
import {HeaderSearchButton, HeaderNotificationButton, HeaderSettingButton} from '~/shared/ui';
import {useMainNavigate} from '~/shared/route';

export const HeaderButtonGroup = () => {
  const {navigateSettingPage, navigateTotalSearchPage, navigateNotificationPage} = useMainNavigate();
  return (
    <StyledContainer>
      <HeaderSearchButton onPress={navigateTotalSearchPage} />
      <HeaderNotificationButton onPress={navigateNotificationPage} />
      <HeaderSettingButton onPress={navigateSettingPage} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex-direction: row;
  padding-right: 16px;
  gap: 12px;
`;
