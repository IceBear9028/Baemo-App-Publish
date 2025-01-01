import React from 'react';
import {Fragment, useCallback, useMemo, useRef} from 'react';
import styled from 'styled-components/native';
import {BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {BottomModalHeader} from '~/shared/bottomSheet';
import {useGetMyGroupList} from '../model/useGetMyGroupList';
import {GroupProfileCard} from './GroupProfileCard.tsx';
import {Groups} from '~/shared/mapper/groups';
import {Avatar, AvatarFallbackText, AvatarImage, Badge, BadgeText, Button, ButtonText, Text} from '@gluestack-ui/themed';
import AddIcon from '~/shared/images/svg/add_circle.svg';

interface Props {
  index?: number;
  group: Groups;
  isSelectLock?: boolean;
  selectGroup: (input: Groups) => void;
}

export const SelectGroupBottomSheet = ({index = 0, selectGroup, group, isSelectLock}: Props) => {
  const ref = useRef<BottomSheetModal>(null);
  const resultSnapPoints = useMemo(() => [300, 500], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0} // 이거 추가
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const {data} = useGetMyGroupList();
  const openBottomSheet = useCallback(() => {
    ref.current?.present();
  }, []);
  const closeBottomSheet = useCallback(() => {
    ref.current?.dismiss();
  }, []);

  return (
    <Fragment>
      <StyledSelectGroup>
        <Text color="$textLight800" lineHeight="$xs" size={'sm'}>
          모임 선택
        </Text>
        <StyledGroupContents>
          <StyledAvatarContainer>
            <Avatar size={'lg'} bgColor={'$trueGray100'}>
              {group ? (
                <Fragment>
                  <AvatarFallbackText>{group.groupsName}</AvatarFallbackText>
                  {group && (
                    <AvatarImage
                      source={{
                        uri: group.gatheringThumbnail,
                      }}
                      alt={'profile 이미지'}
                    />
                  )}
                </Fragment>
              ) : (
                <AddIcon fill={'#ffffff'} />
              )}
            </Avatar>
            <StyledAvatarInfo>
              {group && (
                <Text numberOfLines={1} ellipsizeMode={'tail'}>
                  {group.groupsName}
                </Text>
              )}
              {group?.location && (
                <StyledBadgeContainer>
                  <Badge size={'sm'}>
                    <BadgeText>{group.location}</BadgeText>
                  </Badge>
                </StyledBadgeContainer>
              )}
            </StyledAvatarInfo>
          </StyledAvatarContainer>
          <Button onPress={openBottomSheet} variant={'outline'} size={'xs'} isDisabled={isSelectLock}>
            <ButtonText>모임 선택</ButtonText>
          </Button>
        </StyledGroupContents>
      </StyledSelectGroup>
      <BottomSheetModal ref={ref} index={index} snapPoints={resultSnapPoints} backdropComponent={renderBackdrop} animateOnMount={true}>
        <BottomModalHeader title={'모임 선택'} />
        <BottomSheetScrollView>
          <StyledContentContainer>
            <StyledCardListContainer>
              {data &&
                data.payload.map((group, index) => (
                  <GroupProfileCard
                    {...group}
                    key={`${index}--`}
                    onSelect={() => {
                      selectGroup(group);
                      closeBottomSheet();
                    }}
                  />
                ))}
            </StyledCardListContainer>
          </StyledContentContainer>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </Fragment>
  );
};

const StyledContentContainer = styled.ScrollView`
  flex: 1;
  padding: 10px 20px;
`;

const StyledCardListContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  padding-top: 6px;
  margin-top: 6px;
`;

const StyledSelectGroup = styled.View`
  gap: 4px;
`;

const StyledGroupContents = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledAvatarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const StyledAvatarInfo = styled.View`
  gap: 4px;
  max-width: 150px;
`;

const StyledBadgeContainer = styled.View`
  flex-direction: row;
`;
