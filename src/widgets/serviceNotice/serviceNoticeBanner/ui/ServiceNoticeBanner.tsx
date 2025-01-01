import styled from 'styled-components/native';
import {Badge, BadgeText, Button, ButtonText, Text} from '@gluestack-ui/themed';
import {useFetchPreviewNotice} from '~/widgets/serviceNotice/serviceNoticeBanner/model/useFetchPreviewNotice.ts';
import {useMainNavigate} from '~/shared/route';
import {Fragment} from 'react';

export const ServiceNoticeBanner = () => {
  const {data} = useFetchPreviewNotice();
  const {navigateServiceNoticeDetailPage, navigateServiceNoticeMainPage} = useMainNavigate();

  function detailNotice() {
    data?.length && navigateServiceNoticeDetailPage(data[0].id);
  }

  return (
    <Fragment>
      <StyledPressContainer>
        <StyledButton onPress={detailNotice}>
          <StyledButtonInfo>
            <Badge>
              <BadgeText>{'공지사항'}</BadgeText>
            </Badge>
            <StyledTextContainer>
              <Text size={'sm'} numberOfLines={1} bold={true}>
                {data && data[0]?.title}
              </Text>
            </StyledTextContainer>
          </StyledButtonInfo>
        </StyledButton>
        <Button variant={'link'} size={'sm'} action={'secondary'} onPress={navigateServiceNoticeMainPage}>
          <ButtonText>더보기</ButtonText>
        </Button>
      </StyledPressContainer>
      <StyledDivider />
    </Fragment>
  );
};

const StyledPressContainer = styled.Pressable`
  padding: 10px 20px;
  align-items: center;
  gap: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledDivider = styled.View`
  height: 8px;
  background: #f6f6f6;
`;
const StyledButton = styled.Pressable``;

const StyledButtonInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const StyledTextContainer = styled.View``;
