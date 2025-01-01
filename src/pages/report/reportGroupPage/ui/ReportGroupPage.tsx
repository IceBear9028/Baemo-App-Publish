import {useEffect, useState, useMemo} from 'react';
import styled from 'styled-components/native';
import {useKeyboardHeight} from '~/shared/utils';
import {RootMainStackParamList} from '~/shared/route';
import {GroupReasonList} from '../ui/GroupReasonList.tsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, ButtonSpinner, ButtonText, Text, Textarea, TextareaInput} from '@gluestack-ui/themed';
import {useFetchPostReportGroup, reportGroupCreateDto} from '~/pages/report/reportGroupPage/model/useFetchPostReportGroup.ts';

interface ReportArticlePageProps extends NativeStackScreenProps<RootMainStackParamList, 'reportGroupPage'> {}

export const ReportGroupPage = ({route, navigation}: ReportArticlePageProps) => {
  const keyboardHeight = useKeyboardHeight();
  const {isPendingReportGroup, postReportGroup} = useFetchPostReportGroup();
  const [reasonList, setReasonList] = useState<string[]>([]);
  const [reportDescription, setReportDescription] = useState<string>('');

  const isValid = useMemo(() => reasonList.length !== 0 && reportDescription !== '', [reasonList, reportDescription]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          variant="link"
          isDisabled={!isValid}
          onPress={() =>
            postReportGroup({
              groupsId: route.params.groupsId,
              reasons: reasonList,
              description: reportDescription,
            } as reportGroupCreateDto)
          }>
          {isPendingReportGroup ? <ButtonSpinner /> : <ButtonText>신고하기</ButtonText>}
        </Button>
      ),
    });
  }, [reasonList, reportDescription]);

  return (
    <StyledScrollContainer>
      <StyledContainer>
        <GroupReasonList onChange={setReasonList} />
        <StyledTextContainer marginBottom={keyboardHeight}>
          <Text bold={true}>자세한 내용</Text>
          <Textarea style={{flex: 1, borderWidth: 0, padding: 0}}>
            <TextareaInput
              placeholder="신고 내용에 대해 상세히 적어주세요."
              value={reportDescription}
              onChangeText={setReportDescription}
            />
          </Textarea>
        </StyledTextContainer>
      </StyledContainer>
    </StyledScrollContainer>
  );
};

const StyledContainer = styled.View`
  padding: 20px 20px 0 20px;
  gap: 32px;
`;

const StyledScrollContainer = styled.ScrollView``;

const StyledTextContainer = styled.View<{marginBottom: number}>`
  flex: 1;
  padding: 10px 0 30px 0;
  margin-bottom: ${({marginBottom}) => `${marginBottom}px`};
`;
