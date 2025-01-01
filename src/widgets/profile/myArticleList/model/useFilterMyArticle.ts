import {useState} from 'react';
import {MyArticleTimePeriod} from '~/widgets/profile/myArticleList/api/fetchGetMyArticle.ts';

export function useFilterMyArticle() {
  const filterOptions: MyArticleTimePeriod[] = ['1_week', '1_month', '3_month'];
  const [filterStatus, setFilter] = useState<MyArticleTimePeriod>('1_week');

  function onChangeFilter(input: MyArticleTimePeriod) {
    setFilter(() => input);
  }

  return {
    filterOptions,
    filterStatus,
    onChangeFilter,
  };
}
