import React from 'react';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  DeviceScreen,
  Articles,
  ChatScreen,
  ExerciseScreen,
} from 'screens/bottom';
import {Image, Pressable, View} from 'components/base';
import {StyleSheet} from 'react-native';
import {COLORS} from 'themes/color';
import {ICONS} from 'assets';
import {ChartNoAxesColumnIncreasing, Newspaper} from 'lucide-react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
type BottomParamList = {
  Articles: {route: {name: 'Articles'}};
  Assessment: {route: {name: 'Assessment'}};
  Exercise: {route: {name: 'Exercise'}};
  Chat: {route: {name: 'Chat'}};
  Device: {route: {name: 'Device'}};
};

const BottomTabMain = createBottomTabNavigator({
  tabBar: props => <CustomNavBar {...props} />,
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Articles: {
      screen: Articles,
      options: {title: 'Articles'},
    },

    Exercise: {
      screen: ExerciseScreen,
      options: {title: 'Exercise'},
    },
    Device: {
      screen: DeviceScreen,
      options: {title: 'Device'},
    },
    Chat: {
      screen: ChatScreen,
      options: {title: 'Chat'},
    },
  },
});

export default BottomTabMain;

const CustomNavBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };
        return (
          <AnimatedPressable
            rowCenter
            gap={8}
            height={40}
            radius={20}
            key={route.key}
            onPress={onPress}
            paddingHorizontal={isFocused ? 20 : 12}
            layout={LinearTransition.springify().mass(0.5)}
            backgroundColor={isFocused ? COLORS.primary : COLORS.white}>
            {getIconByRouteName(route.name as keyof BottomParamList, isFocused)}
            {isFocused && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={styles.text}>
                {label as string}
              </Animated.Text>
            )}
          </AnimatedPressable>
        );
      })}
    </View>
  );
};

function getIconByRouteName(
  routeName: keyof BottomParamList,
  isFocused: boolean,
) {
  switch (routeName) {
    case 'Articles':
      return (
        <Newspaper
          size={20}
          color={isFocused ? COLORS.white : COLORS.shadowBlue}
        />
      );

    case 'Exercise':
      return (
        <Image
          square={24}
          source={
            isFocused ? ICONS.ic_bottomExerciseWhite : ICONS.ic_bottomExercise
          }
        />
      );
    case 'Chat':
      return (
        <Image
          square={24}
          source={isFocused ? ICONS.ic_bottomChatWhite : ICONS.ic_bottomChat}
        />
      );
    case 'Device':
      return (
        <ChartNoAxesColumnIncreasing
          size={20}
          strokeWidth={3}
          color={isFocused ? COLORS.white : COLORS.shadowBlue}
        />
      );
    default:
      return (
        <Image
          square={24}
          source={isFocused ? ICONS.ic_bottomHomeWhite : ICONS.ic_bottomHome}
        />
      );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    width: '100%',
    alignSelf: 'center',
    bottom: 0,
    paddingHorizontal: 12,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  text: {
    color: COLORS.white,
    fontWeight: '500',
  },
});
