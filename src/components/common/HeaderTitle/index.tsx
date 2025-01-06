import {Pressable, Text, TextProps, View} from 'components/base';
import {ChevronLeft} from 'lucide-react-native';
import {navigationRef} from 'navigation/navigationRef';
import React, {ReactElement} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'themes/color';
import {HEADER_HEIGHT} from 'themes/helper';

export type HeaderTitleProps = {
  title: string;
  titleSize?: number;
  color?: string;
  canGoBack?: boolean;
  onGoBack?: () => void;
  renderRight?: () => ReactElement;
  subContent?: () => ReactElement;
  font?: TextProps['font'];
};

export const HeaderTitle = ({
  title,
  titleSize = 16,
  canGoBack = true,
  color = COLORS.gunmetal,
  onGoBack = navigationRef.goBack,
  font = 'semiBold',
  renderRight,
  subContent,
}: HeaderTitleProps) => {
  return (
    <View
      paddingHorizontal={12}
      backgroundColor={COLORS.white}
      minHeight={HEADER_HEIGHT}>
      <View width={'100%'} marginTop={40} rowCenter>
        {canGoBack && (
          <Pressable square={40} onPress={onGoBack} contentCenter>
            <ChevronLeft strokeWidth={1.5} size={24} />
          </Pressable>
        )}
        <View flex>
          <Text
            textAlign="center"
            color={COLORS.black}
            fontSize={titleSize}
            font={font}
            numberOfLines={1}>
            {title}
          </Text>
          {subContent && subContent()}
        </View>

        {renderRight ? (
          renderRight()
        ) : (
          <View square={40} /> // Placeholder để đảm bảo cân đối
        )}
      </View>
    </View>
  );
};
