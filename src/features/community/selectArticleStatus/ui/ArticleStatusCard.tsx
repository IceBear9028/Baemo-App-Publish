import {Button, ButtonText} from '@gluestack-ui/themed';
import styled from 'styled-components/native';
import {ArticleCommunityStatus, ArticleStatus, ServiceNoticeArticleStatus} from '~/shared/mapper/community';
import React from 'react';
import {ArticleGroupStatus} from '~/shared/mapper/groups';

interface ArticleStatusCardProps {
  status: keyof ArticleStatus;
  isSelect?: boolean;
  onPress?: () => void;
}

const badgeOption = {
  ...new ArticleGroupStatus(),
  ...new ArticleCommunityStatus(),
  ...new ServiceNoticeArticleStatus(),
};

export const ArticleStatusCard = ({onPress, status, isSelect}: ArticleStatusCardProps) => {
  function pressEvent() {
    onPress && onPress();
  }
  return (
    <Button borderRadius="$full" size={'xs'} variant={isSelect ? 'solid' : 'outline'} action={'secondary'} onPress={pressEvent}>
      <ButtonText>{badgeOption[status]}</ButtonText>
    </Button>
  );
};

const StyledContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px 20px;
  justify-content: space-between;
`;
