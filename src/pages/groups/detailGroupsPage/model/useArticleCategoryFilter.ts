import {useState} from 'react';
import {ArticleGroupStatus} from '~/shared/mapper/groups';
import {ArticleGroupCategoryId} from 'widgets/groups/groupArticleList';

const categoryOption = {all: '전체', ...new ArticleGroupStatus()};

export function useArticleCategoryFilter() {
  const categoryKeys = Object.keys(categoryOption).reverse() as ArticleGroupCategoryId[];
  const [initCategoryId, setCategoryId] = useState<ArticleGroupCategoryId>('all');

  function changeCategory(id: ArticleGroupCategoryId) {
    setCategoryId(id);
  }

  return {
    categoryKeys,
    categoryOption,
    initCategoryId,
    changeCategory,
  };
}
