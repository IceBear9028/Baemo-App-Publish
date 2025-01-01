import {useEffect, useState, useMemo} from 'react';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainStackParamList} from '~/shared/route';
import {useKeyboardHeight} from '~/shared/utils';
import {ArticleReasonList} from '~/pages/report/reportArticlePage/ui/ArticleReasonList.tsx';
import {Button, ButtonSpinner, ButtonText, Text, Textarea, TextareaInput} from '@gluestack-ui/themed';
import {useFetchPostReportArticle, reportArticleCreateDto} from '~/pages/report/reportArticlePage/model/useFetchPostReportArticle.ts';

interface ReportArticlePageProps extends NativeStackScreenProps<RootMainStackParamList, 'reportArticlePage'> {}

export const ReportArticlePage = ({route, navigation}: ReportArticlePageProps) => {
  const keyboardHeight = useKeyboardHeight();
  const [reasonList, setReasonList] = useState<string[]>([]);
  const [reportDescription, setReportDescription] = useState<string>('');
  const {isPendingReportArticle, postReportArticle} = useFetchPostReportArticle();

  const isValid = useMemo(() => reasonList.length !== 0 && reportDescription !== '', [reasonList, reportDescription]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          variant="link"
          isDisabled={!isValid}
          onPress={() =>
            postReportArticle({
              postId: route.params.id,
              reasons: reasonList,
              description: reportDescription,
            } as reportArticleCreateDto)
          }>
          {isPendingReportArticle ? <ButtonSpinner /> : <ButtonText>신고하기</ButtonText>}
        </Button>
      ),
    });
  }, [reasonList, reportDescription]);

  return (
    <StyledScrollContainer>
      <StyledContainer>
        <ArticleReasonList onChange={setReasonList} />
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
