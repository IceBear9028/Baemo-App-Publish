import {Button, ButtonIcon, ShareIcon} from '@gluestack-ui/themed';
import React from 'react-native';
import {KakaoTemplateContent, shareLocationTemplate} from '@react-native-kakao/share';
import {convertDomainDataToLocationTemplate} from '~/shared/invitation/util/invitation-utils.ts';
import {fetchGetExerciseIntro} from '~/features/exercise/detailExerciseIntroduction/api/exerciseInfo.ts';
import {fetchGetDetailGame} from '~/features/game/fetchDetailGame/api/fetchGetDetailGame.ts';
import {DetailGame, ExerciseIntro} from '~/shared/mapper/exercise';
import {useEffect, useState} from 'react';
import {DEFAULT_IMAGE_URL} from '~/shared/deeplink/util/deeplink-constants.ts';

/**
 * 주소를 이용하여 특정 위치를 공유할 수 있는 메시지 템플릿.
 *
 * @property address 공유할 위치의 주소. 예) 경기 성남시 분당구 판교역로 235
 * @property addressTitle 카카오톡 내의 지도 뷰에서 사용되는 타이틀. 예) 카카오판교오피스
 * @property content 위치에 대해 설명하는 컨텐츠 정보
 * @property social 댓글수, 좋아요수 등, 컨텐츠에 대한 소셜 정보
 * @property buttons 버튼 목록. 기본 버튼의 타이틀 외에 링크도 변경하고 싶을 때 설정. (최대 1개, 오른쪽 위치 보기 버튼은 고정)
 * @property buttonTitle 기본 버튼 타이틀(자세히 보기)을 변경하고 싶을 때 설정. 이 값을 사용하면 클릭 시 이동할 링크는 content에 입력된 값이 사용됨.
 */
export enum KakaoLocationTypes {
  EXERCISE,
  GAME,
}

interface ButtonProps {
  id: number;
  type: KakaoLocationTypes;
}

export default function KakaoLocationTypeShareButton({id, type}: ButtonProps) {
  const [location, setLocation] = useState<string>('');
  const [shareContent, setShareContent] = useState<KakaoTemplateContent>({
    title: '',
    imageUrl: '',
    link: {webUrl: '', mobileWebUrl: ''},
  });

  const initData = async () => {
    let data: ExerciseIntro | DetailGame | null = null;
    switch (type) {
      case KakaoLocationTypes.EXERCISE:
        data = await fetchGetExerciseIntro(Number(id));
        setShareContent({
          title: `[배모 운동 초대] ${data.name} 에 초대합니다!`,
          imageUrl: data.exerciseThumbnail ? data.exerciseThumbnail : DEFAULT_IMAGE_URL,
          link: {
            androidExecutionParams: {pageName: 'detailExercisePage', exerciseId: data.exerciseId.toString()},
            iosExecutionParams: {pageName: 'detailExercisePage', exerciseId: data.exerciseId.toString()},
          },
          description: data.description,
        });
        setLocation(data.locationDetail.address ? data.locationDetail.address : data.location);
        break;
      case KakaoLocationTypes.GAME:
        data = await fetchGetDetailGame(Number(id));
        setShareContent({
          title: '게임에 초대합니다!',
          imageUrl: DEFAULT_IMAGE_URL,
          link: {
            androidExecutionParams: {pageName: 'detailGamePage', gameId: data.gameId.toString()},
            iosExecutionParams: {pageName: 'detailGamePage', gameId: data.gameId.toString()},
          },
        });
        setLocation('');
        break;
    }
  };

  const onShareButtonPress = () => {
    try {
      const template = convertDomainDataToLocationTemplate(shareContent, location);
      console.log('Kakao Share Executed By Template:', template.template.content);
      if (template.template.content) {
        shareLocationTemplate(template);
      }
    } catch (error) {
      console.error(`ERROR ::: Kakao Location Share ::: ${error}`);
    }
  };

  useEffect(() => {
    initData().catch(err => console.error(`ERROR ::: Kakao Location Share Button ::: Type: ${type}, id: ${id}, description: ${err}`));
  }, [id, type]);

  return (
    <Button variant="link" size="sm" onPress={onShareButtonPress}>
      <ButtonIcon style={{color: 'black'}} as={ShareIcon} />
    </Button>
  );
}
