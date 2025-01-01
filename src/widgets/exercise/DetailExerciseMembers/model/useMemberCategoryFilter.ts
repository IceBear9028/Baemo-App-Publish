import {useState} from 'react';

type CategoryKey = 'waiting' | 'participate';
type Category = {[index in CategoryKey]: string};

const categoryOption: Category = {
  waiting: '대기중',
  participate: '참가중',
};

export function useMemberCategoryFilter() {
  const categoryKeys = Object.keys(categoryOption).reverse() as CategoryKey[];
  const [initCategoryId, setCategoryId] = useState<CategoryKey>('participate');

  function changeCategory(id: CategoryKey) {
    setCategoryId(id);
  }

  return {
    categoryKeys,
    categoryOption,
    initCategoryId,
    changeCategory,
  };
}
