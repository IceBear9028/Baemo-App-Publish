import {KakaoTemplateContent, shareFeedTemplate} from '@react-native-kakao/share';
import React from 'react-native';

import {convertDomainDataToFeedTemplate} from '~/shared/invitation/util/invitation-utils.ts';
import {Button, ButtonIcon, ShareIcon} from '@gluestack-ui/themed';
import {useEffect, useState} from 'react';
import {DEFAULT_IMAGE_URL} from '~/shared/deeplink/util/deeplink-constants.ts';
import {fetchGetGroupIntro} from '~/features/groups/detailGroupsIntroduction/api/fetchGetGroupIntro.ts';
import {GroupsIntro} from '~/shared/mapper/groups';

/**
 * 기본 템플릿으로 제공되는 피드 템플릿 클래스.
 *
 * @property content 메시지의 메인 콘텐츠 정보
 * @property itemContent 아이템 영역에 포함할 콘텐츠, [ItemContent] 참고
 * @property social 콘텐츠에 대한 소셜 정보
 * @property buttons 버튼 목록, 최대 2개. 버튼 타이틀과 링크를 변경하고 싶을 때, 버튼 두 개를 넣고 싶을 때 사용
 * @property buttonTitle 기본 버튼 타이틀(자세히 보기)을 변경하고 싶을 때 설정. 이 값을 사용하면 클릭 시 이동할 링크는 content 에 입력된 값이 사용됨.
 */

// 여러 타입에 따른 분기 처리 위함. 추가해서 사용
export enum KakaoShareFeedTypes {
  GROUP,
}

interface ButtonProps {
  id: number;
  type: KakaoShareFeedTypes;
}

export default function KakaoFeedTypeShareButton({id, type}: ButtonProps) {
  const [shareContent, setShareContent] = useState<KakaoTemplateContent>({
    title: '',
    imageUrl: '',
    link: {webUrl: '', mobileWebUrl: ''},
  });

  const initData = async () => {
    let data: GroupsIntro | null = null;
    switch (type) {
      case KakaoShareFeedTypes.GROUP:
        data = await fetchGetGroupIntro(Number(id));
        setShareContent({
          title: `[배모 모임 초대] ${data.groupsName} 에 초대합니다!`,
          imageUrl: data.background ? data.background : DEFAULT_IMAGE_URL,
          link: {
            androidExecutionParams: {pageName: 'detailGroupsPage', groupsId: id.toString()},
            iosExecutionParams: {pageName: 'detailGroupsPage', groupsId: id.toString()},
          },
          imageWidth: 400,
          imageHeight: 240,
          description: data.groupsDescription,
        });
        break;
    }
  };

  const onShareButtonPress = () => {
    console.log('onShareButtonPressed!!');
    try {
      const template = convertDomainDataToFeedTemplate(shareContent);
      if (template.template.content) {
        shareFeedTemplate(template);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initData().catch(err => console.error(`ERROR ::: Kakao Feed Share Button ::: Type: ${type}, id: ${id}, description: ${err}`));
  }, []);

  return (
    <Button variant="link" size="sm" onPress={onShareButtonPress}>
      <ButtonIcon style={{color: 'black'}} as={ShareIcon} />
    </Button>
  );
}
