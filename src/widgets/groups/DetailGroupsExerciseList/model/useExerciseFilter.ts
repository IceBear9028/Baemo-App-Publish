import {ExerciseStatus} from '~/shared/mapper/exercise';
import {useState} from 'react';

interface FilterCategory extends ExerciseStatus {
  ALL: '전체';
}
const categoryOption: FilterCategory = {...new ExerciseStatus(), ALL: '전체'};

export function useExerciseFilter() {
  const categoryKeys = Object.keys(categoryOption).reverse() as (keyof FilterCategory)[];
  const [initCategoryId, setCategoryId] = useState<keyof FilterCategory>('ALL');

  function changeCategory(categoryKey: keyof FilterCategory) {
    setCategoryId(categoryKey);
  }

  return {
    categoryKeys,
    categoryOption,
    initCategoryId,
    changeCategory,
  };
}
