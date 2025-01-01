import React, {ReactElement, useState} from 'react';
import styled from 'styled-components/native';
import {Button, ButtonGroup, ButtonText} from '@gluestack-ui/themed';

export type FilterOptionType = {
  name: string;
  value: string; // 실제 처리부분은 string 처리만 되어있어서 string 단일 타입으로 변경
  onClick?: () => void;
};

interface FilterProps<InitOption> {
  children: ReactElement<FilterOptionProps<InitOption>> | ReactElement<FilterOptionProps<InitOption>>[];
  onChange?: (input: InitOption) => void;
  initOption?: InitOption;
}

interface FilterOptionProps<FilterValue = any> {
  __onChange?: (input: FilterValue) => void;
  __variant?: 'outline' | 'solid';
  name: string;
  value: FilterValue;
  onPress?: (input?: FilterValue) => void;
}

/** ### Filter
 *
 * #### Filter 사용방법
 * 1. FilterOption 을 감싸기 위한 Filter 컴포넌트 호출 생성
 * 2. FilterOption 에 선택했을 때의 value, name 지정
 *
 * @example
 * const Container = () => {
 *   const [selectStatus, setSelectStatus] = useState<Value>();
 *   ...
 *   return(
 *     <Filter initOption={selectStatus} onChange={setSelectStatus}>
 *       <FilterOption name="Test1" value={'test1'} />
 *       <FilterOption name="Test1" value={'test2'} />
 *       ...
 *     <Tab>
 *   )
 * }
 *
 * @param {children}, [필수] ReactElement<FilterOption> | ReactElement<FilterOption>[]
 * @param {initOption} Filter 의 초기 선택된 값
 * @param {onChange}, 클릭된 FilterOption 의 상태 저장시 업데이트 하는 setter 함수
 * @param {color}, Chip 의 컬러 스키마
 * @param {size}, Chip 의 사이즈
 */
export function Filter<InitOption extends string | number>({children, initOption, onChange}: FilterProps<InitOption>) {
  const optionList = React.Children.map(children, optionChild => ({
    name: optionChild.props.name,
    value: optionChild.props.value,
  }));
  const createOptionList = (init?: string | number) => {
    if (init && optionList.find(option => option.value === init)) {
      return optionList.map(option => ({name: option.name, value: option.value, isFocus: init === option.value}));
    } else {
      return optionList.map((option, index) => ({name: option.name, value: option.value, isFocus: index === 0}));
    }
  };
  const [optionStatus, setOptionStatus] = useState(createOptionList(initOption));

  function selectOption(option: string) {
    setOptionStatus(prev => prev.map(prevOption => ({...prevOption, isFocus: prevOption.name === option})));
  }

  // 최초 로드되고 다른 컴포넌트에 의해 initOption 바뀌게 되는 경우 useState 값이 변경되지 않기 때문에, 의존 배열 추가

  return (
    <StyledContainer>
      <StyledScrollContainer horizontal={true} showsHorizontalScrollIndicator={false} overScrollMode={'never'}>
        <ButtonGroup flexDirection={'row'}>
          {React.Children.map(children, (child, childId) => {
            return React.cloneElement(child, {
              ...child.props,
              __onChange: () => {
                onChange && onChange(child.props.value);
                selectOption(child.props.name);
              },
              __variant: optionStatus[childId].isFocus ? 'solid' : 'outline',
            });
          })}
        </ButtonGroup>
        <SpaceContainer />
      </StyledScrollContainer>
    </StyledContainer>
  );
}

export function FilterOption<Option>({name, value, onPress, __onChange, __variant}: FilterOptionProps<Option>) {
  function pressEventHandler() {
    __onChange && __onChange(value);
    onPress && onPress(value);
  }

  return (
    <Button borderRadius="$full" size={'xs'} variant={__variant} action={'secondary'} onPress={pressEventHandler}>
      <ButtonText>{name}</ButtonText>
    </Button>
  );
}

/** ### FilterContainer
 * - Filter 의 가장 밖을 감싸는 Container
 * - Filter 외에 다른 컴포넌트 배치 시 사용할 것
 */
export const FilterContainer = styled.View`
  flex-direction: row;
  align-self: stretch;
  justify-content: flex-end;
`;

const StyledContainer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 14px 0 14px 20px;
  height: 60px;
`;

const StyledScrollContainer = styled.ScrollView`
  overflow: visible;
  flex-direction: row;
  gap: 10px;
`;

const SpaceContainer = styled.View`
  width: 140px;
`;
