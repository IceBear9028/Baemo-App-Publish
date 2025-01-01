import styled from 'styled-components/native';
import {RootMainStackParamList} from '~/shared/route';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ServiceNoticeList, useServiceNoticeRole} from '~/widgets/serviceNotice/serviceNoticeList';
import {CreateServiceNoticeButton} from '~/widgets/serviceNotice/createServiceNoticeButton';

interface ServiceNoticeMainPage extends NativeStackScreenProps<RootMainStackParamList, 'serviceNoticeMainPage'> {}

export const ServiceNoticeMainPage = ({route}: ServiceNoticeMainPage) => {
  const {role} = useServiceNoticeRole();
  return (
    <StyledContainer>
      <ServiceNoticeList />
      {role && role === 'BAEMO_ADMIN' && <CreateServiceNoticeButton />}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;
