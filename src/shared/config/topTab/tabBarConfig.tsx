import React from 'react';
import styled from 'styled-components/native';
import {Text} from '@gluestack-ui/themed';
import {useToken} from '@gluestack-style/react';
import {MaterialTopTabNavigationOptions} from '@react-navigation/material-top-tabs';

type TopTabBarConfigType = (tabHeaderName?: string) => MaterialTopTabNavigationOptions;

// 전체 TopTab 에 대한 스타일 커스텀
export const TopTabBarConfig: TopTabBarConfigType = tabHeaderName => {
  const primaryColorToken = useToken('colors', 'primary500');
  return {
    tabBarStyle: {
      paddingLeft: 12,
      paddingRight: 12,
      borderBottomColor: '#asasas',
    },
    tabBarItemStyle: {
      width: 'auto',
      borderBottomColor: primaryColorToken,
      paddingBottom: 0,
    },
    tabBarIndicator: () => <React.Fragment />,
    tabBarLabel: ({focused, children}) => {
      const TabName = tabHeaderName ? tabHeaderName : children;
      return (
        <StyledTabContainer focus={focused} primaryColor={primaryColorToken}>
          {focused ? (
            <Text color={'$textLight950'} size={'md'}>
              {TabName}
            </Text>
          ) : (
            <Text size={'md'}>{TabName}</Text>
          )}
        </StyledTabContainer>
      );
    },
  };
};

const StyledTabContainer = styled.View<{focus: boolean; primaryColor: string}>`
  padding-bottom: 10px;
  border-bottom-width: 3px;
  border-bottom-color: ${({primaryColor, focus}) => (focus ? primaryColor : 'transparent')};
`;
