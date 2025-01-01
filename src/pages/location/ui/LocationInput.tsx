import styled from 'styled-components/native';
import {Text} from '@gluestack-ui/themed';
import {LocationResponse} from '~/pages/location';

interface LocationInputProps {
  locationRes: LocationResponse | null;
  onPress?: () => void;
}

export const LocationInput = ({locationRes, onPress}: LocationInputProps) => {
  return (
    <StyledContainer onPress={onPress}>
      {locationRes ? (
        <Text color={'$textLight900'} numberOfLines={1} ellipsizeMode={'tail'}>
          {locationRes.location ? locationRes.location : locationRes.locationDetail.address}
        </Text>
      ) : (
        <Text color={'$textLight400'} numberOfLines={1} ellipsizeMode={'tail'}>
          장소를 입력해주세요.
        </Text>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.Pressable`
  flex: 1;
  height: 38px;
  border-color: #d0d0d0;
  border-width: 1px;
  justify-content: center;
  margin-right: 12px;
  padding: 8px 12px;
  border-radius: 4px;
  overflow: scroll;
`;

const StyledScrollContainer = styled.ScrollView`
  overflow: visible;
  flex-direction: row;
  gap: 10px;
`;
