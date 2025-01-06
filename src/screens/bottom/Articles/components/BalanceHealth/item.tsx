import {Image, Pressable, Text, View} from 'components/base';
import {navigationRef} from 'navigation/navigationRef';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, GRADIENT} from 'themes/color';
import {width} from 'themes/helper';

const Item = ({
  item,
}: {
  item: {name: string; description: string; _id: string};
}) => {
  return (
    <Pressable
      onPress={() => navigationRef.navigate('DetailArticle')}
      marginRight={15}
      radius={10}
      width={width / 1.5}
      height={width / 1.8}>
      <Image
        radius={10}
        width={'100%'}
        height={'100%'}
        contentFit="cover"
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8MUeWXLFkcaZEQ9q9iysRIPUlkY6JkJAOCQ&s',
        }}
      />
      <LinearGradient
        style={{
          position: 'absolute',
          paddingHorizontal: 10,
          bottom: 0,
          height: '60%',
          width: '100%',
          justifyContent: 'flex-end',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={GRADIENT.itemBalance}>
        <View
          paddingHorizontal={5}
          paddingVertical={1}
          alignSelf="flex-start"
          backgroundColor={COLORS.white}
          radius={10}>
          <Text fontSize={11}>Balance Health</Text>
        </View>

        <Text marginTop={3} color={COLORS.white}>
          What is Balance Health?
        </Text>
        <View rowCenter justifyContent="space-between" marginBottom={10}>
          <Text fontSize={12} color={COLORS.cadetGrey}>
            5 min read
          </Text>
          <Text font="semiBold" fontSize={12} color={COLORS.shadowBlue}>
            CDC verifed
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default Item;
