import React from 'react';
import {Pressable, PressableProps} from '../Pressable';
import {COLORS} from 'themes/color';
import {Check} from 'lucide-react-native';
type CheckBoxProps = PressableProps & {
  isCheck?: boolean;
  inActiveColor?: string;
  activeColor?: string;
  size?: number;
};

export const CheckBox = ({
  isCheck = false,
  inActiveColor = COLORS.white,
  activeColor = COLORS.black,
  size = 20,
  ...props
}: CheckBoxProps) => {
  return (
    <Pressable
      square={size}
      radius={size / 4}
      backgroundColor={isCheck ? COLORS.black : inActiveColor}
      borderWidth={1}
      borderColor={isCheck ? activeColor : COLORS.lightGray}
      contentCenter
      {...props}>
      {isCheck && <Check size={size * 0.8} color={COLORS.white} />}
    </Pressable>
  );
};
