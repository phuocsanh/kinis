import React, {ReactElement} from 'react';
import {ActivityIndicator} from 'react-native';

import {COLORS} from 'themes/color';
import {Text, TextProps} from '../Text';
import {Pressable, PressableProps} from '../Pressable';
import {View} from '../View';

type ButtonProps = Partial<
  {
    onPress: () => void;
    outline: boolean;
    disabled: boolean;
    loading: boolean;
    maxWidth: number;
    title: string;
    color: string;
    fontSize: TextProps['fontSize'];
    font: TextProps['font'];
    iconLeft: ReactElement;
    iconRight: ReactElement;
  } & PressableProps
>;

export const Button = ({
  onPress,
  title = '',
  disabled,
  font,
  iconLeft,
  iconRight,
  radius = 24,
  height = 50,
  fontSize = 16,
  loading = false,
  outline = false,
  backgroundColor = outline ? 'transparent' : COLORS.primary,
  color = outline ? COLORS.primary : COLORS.white,
  ...containerProps
}: ButtonProps) => {
  return (
    <Pressable
      height={height}
      radius={radius}
      onPress={onPress}
      contentCenter
      borderWidth={1}
      borderColor={outline ? color : disabled ? COLORS.border : backgroundColor}
      backgroundColor={disabled ? COLORS.border : backgroundColor}
      disabled={loading || disabled}
      {...containerProps}>
      {loading ? (
        <ActivityIndicator size="small" color={color} />
      ) : (
        <View rowCenter>
          {iconLeft}
          <Text color={color} fontSize={fontSize} font={font}>
            {title}
          </Text>
          {iconRight}
        </View>
      )}
    </Pressable>
  );
};
