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

import {DetectScreen, HomeScreen, MessagesScreen} from 'screens/bottom';
import {Image, Pressable, View} from 'components/base';
import {StyleSheet} from 'react-native';
import {COLORS} from 'themes/color';
import {ICONS} from 'assets';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
type BottomParamList = {
  BottomHomeScreen: {route: {name: 'BottomHomeScreen'}};
  BottomAssessmentScreen: {route: {name: 'BottomAssessmentScreen'}};
  BottomExerciseScreen: {route: {name: 'BottomExerciseScreen'}};
  BottomMessageScreen: {route: {name: 'BottomMessageScreen'}};
  BottomDeviceScreen: {route: {name: 'BottomDeviceScreen'}};
};
// export default function Bottom() {
//   return (
//     <Tabs.Navigator
//       initialRouteName="BottomHomeScreen"
//       screenOptions={{headerShown: false}}
//       tabBar={CustomNavBar}>
//       <Tabs.Screen
//         name="BottomHomeScreen"
//         component={HomeScreen}
//         options={{tabBarLabel: 'Home'}}
//       />
//       <Tabs.Screen
//         name="BottomAssessmentScreen"
//         component={DetectScreen}
//         options={{tabBarLabel: 'Assessment'}}
//       />
//       <Tabs.Screen
//         name="BottomExerciseScreen"
//         component={MessagesScreen}
//         options={{tabBarLabel: 'Exercise'}}
//       />
//       <Tabs.Screen
//         name="BottomMessageScreen"
//         component={DetectScreen}
//         options={{tabBarLabel: 'Chat'}}
//       />
//       <Tabs.Screen
//         name="BottomDeviceScreen"
//         component={MessagesScreen}
//         options={{tabBarLabel: 'Device'}}
//       />
//     </Tabs.Navigator>
//   );
// }
const BottomTabMain = createBottomTabNavigator({
  tabBar: props => <CustomNavBar {...props} />,
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {title: 'Home'},
    },
    Assessment: {
      screen: DetectScreen,
      options: {title: 'Assessment'},
    },

    MessagesScreen: {
      screen: MessagesScreen,
      options: {title: 'Exercise'},
    },
    Chat: {
      screen: MessagesScreen,
      options: {title: 'Chat'},
    },
    Device: {
      screen: MessagesScreen,
      options: {title: 'Device'},
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
    case 'BottomHomeScreen':
      return (
        <Image
          square={24}
          source={isFocused ? ICONS.ic_bottomHomeWhite : ICONS.ic_bottomHome}
        />
      );
    case 'BottomAssessmentScreen':
      return (
        <Image
          square={24}
          source={
            isFocused
              ? ICONS.ic_bottomAssessmentWhite
              : ICONS.ic_bottomAssessment
          }
        />
      );
    case 'BottomExerciseScreen':
      return (
        <Image
          square={24}
          source={
            isFocused ? ICONS.ic_bottomExerciseWhite : ICONS.ic_bottomExercise
          }
        />
      );
    case 'BottomMessageScreen':
      return (
        <Image
          square={24}
          source={isFocused ? ICONS.ic_bottomChatWhite : ICONS.ic_bottomChat}
        />
      );
    case 'BottomDeviceScreen':
      return (
        <Image
          square={24}
          source={
            isFocused ? ICONS.ic_bottomDeviceWhite : ICONS.ic_bottomDevice
          }
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
