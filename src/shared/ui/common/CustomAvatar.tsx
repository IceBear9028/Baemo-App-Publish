import {Avatar, AvatarFallbackText, AvatarImage} from '@gluestack-ui/themed';
import styled from 'styled-components/native';

type ColorSchemeKeys = 'green' | 'gray';

type AvatarColorScheme = {
  [key in ColorSchemeKeys]: {
    backgroundColor: string;
    color: string;
  };
};

interface CustomAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  name?: string | null;
  profileImage?: string | null;
  nickName?: string;
  alt?: string;
  colorScheme?: ColorSchemeKeys;
  onPress?: () => void;
}

export const CustomAvatar = ({
  size,
  profileImage,
  name,
  nickName,
  onPress,
  alt = 'profile-image',
  colorScheme = 'gray',
}: CustomAvatarProps) => {
  const colorKeys: AvatarColorScheme = {
    green: {
      backgroundColor: '$emerald600',
      color: '$white',
    },
    gray: {
      backgroundColor: '$trueGray200',
      color: '$textLight700',
    },
  };
  return (
    <StyledPress onPress={onPress}>
      <Avatar size={size} backgroundColor={colorKeys[colorScheme].backgroundColor}>
        <AvatarFallbackText color={colorKeys[colorScheme].color}>{name ? name : nickName}</AvatarFallbackText>
        {profileImage && <AvatarImage source={{uri: profileImage}} alt={alt} />}
      </Avatar>
    </StyledPress>
  );
};

const StyledPress = styled.Pressable``;
