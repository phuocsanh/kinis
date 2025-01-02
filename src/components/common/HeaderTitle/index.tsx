import {Pressable, Text, View} from 'components/base';
import {ChevronLeft} from 'lucide-react-native';
import {navigationRef} from 'navigation/navigationRef';
import React, {ReactElement} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'themes/color';
import {HEADER_HEIGHT} from 'themes/helper';

export type HeaderTitleProps = {
  title: string;
  titleSize?: number;
  canGoBack?: boolean;
  onGoBack?: () => void;
  renderRight?: () => ReactElement;
};

export const HeaderTitle = ({
  title,
  titleSize = 18,
  canGoBack = true,
  onGoBack = navigationRef.goBack,
  renderRight,
}: HeaderTitleProps) => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={{paddingTop: top}}>
      <View height={HEADER_HEIGHT} paddingHorizontal={12}>
        <View marginTop={13} rowCenter height={28}>
          {canGoBack && (
            <Pressable
              onPress={onGoBack}
              alignSelf="stretch"
              contentCenter
              paddingRight={15}>
              <ChevronLeft
                style={{marginLeft: 10}}
                strokeWidth={1.5}
                size={24}
              />
            </Pressable>
          )}
          <Text
            color={COLORS.white}
            font="medium"
            fontSize={titleSize}
            flex
            numberOfLines={1}>
            {title}
          </Text>
          {renderRight && renderRight()}
        </View>
      </View>
    </View>
  );
};
