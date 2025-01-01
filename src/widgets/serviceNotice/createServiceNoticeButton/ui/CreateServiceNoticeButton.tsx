import React from 'react';
import {FabButton, FabButtonContainer} from '~/shared/ui';
import {EditIcon, FabIcon} from '@gluestack-ui/themed';
import {useMainNavigate} from '~/shared/route';

export const CreateServiceNoticeButton = () => {
  const {navigateServiceNoticeArticleWritePage} = useMainNavigate();
  function navigateArticleWrite() {
    navigateServiceNoticeArticleWritePage();
  }
  return (
    <FabButtonContainer>
      <FabButton icon={<FabIcon as={EditIcon} />} title={'글쓰기'} onPress={navigateArticleWrite} />
    </FabButtonContainer>
  );
};
