import React, {Fragment, ReactElement} from 'react';
import styled from 'styled-components/native';
import {Exercise} from '~/shared/mapper/exercise';
import {ExerciseStatusBadge, ExerciseTypeBadge, FeatureDivider, RectThumbnail} from '~/shared/ui';
import {Button, ButtonText, Text} from '@gluestack-ui/themed';
import {useFetchGetExerciseIntro} from '~/features/exercise/detailExerciseIntroduction/model/useFetchGetExerciseIntro.ts';
import {useMainNavigate} from '~/shared/route';
import LocationIcon from '~/shared/images/svg/exercise_location.svg';
import CalendarIcon from '~/shared/images/svg/exercise_calendar.svg';
import GroupIcon from '~/shared/images/svg/exercise_group_outlined.svg';
import TimeIcon from '~/shared/images/svg/alarm_time.svg';
import {exerciseTimeFormat} from '~/features/exercise/detailExerciseIntroduction/utils/exerciseTimeFormat.ts';

interface InfoTitleProps {
  title: string;
  icon: ReactElement;
  children: ReactElement;
}

const InfoSection = ({title, icon, children}: InfoTitleProps) => {
  return (
    <StyledInfoContent>
      <StyledInfoTitle>
        {icon}
        <Text size={'sm'} bold={true}>
          {title}
        </Text>
        <StyledDivider />
      </StyledInfoTitle>
      {children}
    </StyledInfoContent>
  );
};

export const DetailExerciseIntroduction = (props: Readonly<Pick<Exercise, 'exerciseId'>>) => {
  const {navigateDetailGroup} = useMainNavigate();
  const {data: introData} = useFetchGetExerciseIntro(props.exerciseId);
  const {datePart, timeRange} = exerciseTimeFormat(introData?.startTime, introData?.endTime);

  function pressGroupContainer() {
    introData?.groupsId && navigateDetailGroup(introData.groupsId);
  }

  return (
    <Fragment>
      <StyledContainer>
        <StyledHeaderContainer>
          <RectThumbnail src={introData?.exerciseThumbnail} />
          <StyledHeaderContentGroup>
            <StyledHeaderContent>
              <ExerciseStatusBadge status={introData?.exerciseStatus} />
              {introData && (
                <Text bold={true} size={'md'} color={'$textLight950'}>
                  {introData.name}
                </Text>
              )}
            </StyledHeaderContent>
            <StyledHeaderContent>
              <ExerciseTypeBadge exerciseType={introData?.exerciseType} />
              {introData?.groupsId && (
                <Button size={'xs'} variant={'link'} onPress={pressGroupContainer}>
                  <ButtonText>{introData.groupsName}</ButtonText>
                </Button>
              )}
            </StyledHeaderContent>
          </StyledHeaderContentGroup>
        </StyledHeaderContainer>
        <StyledInfoContainer>
          <InfoSection title={'날짜'} icon={<CalendarIcon width={20} height={20} />}>
            <StyledTextContainer>
              {introData && (
                <Text size={'sm'} color={'$textLight950'}>
                  {datePart}
                </Text>
              )}
            </StyledTextContainer>
          </InfoSection>
          <InfoSection title={'시간'} icon={<TimeIcon width={20} height={20} style={{color: '#e5e5e5'}} />}>
            <StyledTextContainer>
              {introData && (
                <Text size={'sm'} color={'$textLight950'}>
                  {timeRange}
                </Text>
              )}
            </StyledTextContainer>
          </InfoSection>
          <InfoSection title={'위치'} icon={<LocationIcon width={20} height={20} />}>
            <Fragment>
              {introData && (
                <Text size={'sm'} color={'$textLight950'}>
                  {introData.location}
                </Text>
              )}
            </Fragment>
          </InfoSection>
          <InfoSection title={'모임 인원'} icon={<GroupIcon width={20} height={20} />}>
            <Fragment>
              {introData && (
                <Text size={'sm'} color={'$textLight950'}>
                  {`${introData.currentHeadCount} / ${introData.headCount} 명`}
                </Text>
              )}
            </Fragment>
          </InfoSection>
          {/* 모임운동인 경우에는 게스트 인원을 표시 */}
          {introData?.exerciseType === 'CLUB' && (
            <InfoSection title={'게스트 인원'} icon={<GroupIcon width={20} height={20} />}>
              <Fragment>
                {introData && (
                  <Text size={'sm'} color={'$textLight950'}>
                    {`${introData.currentGuestHeadCount} / ${introData.guestHeadCount} 명`}
                  </Text>
                )}
              </Fragment>
            </InfoSection>
          )}
        </StyledInfoContainer>
        <Text size={'sm'}>{introData?.description}</Text>
      </StyledContainer>
      <FeatureDivider />
    </Fragment>
  );
};

const StyledContainer = styled.View`
  padding: 24px 20px 30px 20px;
  gap: 15px;
`;

const StyledHeaderContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const StyledHeaderContentGroup = styled.View`
  justify-content: center;
  gap: 4px;
`;

const StyledHeaderContent = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;

const StyledInfoContainer = styled.View`
  gap: 10px;
`;

const StyledInfoContent = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const StyledInfoTitle = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const StyledDivider = styled.View`
  width: 2px;
  height: 20px;
`;

const StyledTextContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
