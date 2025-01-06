import React, {useCallback, useState} from 'react';
import {Image, Pressable, Text, View} from 'components/base';
import {COLORS} from 'themes/color';
import {Bell, Search, User} from 'lucide-react-native';
import {FlatList, StyleSheet, TextInput, TextInputBase} from 'react-native';
import {navigationRef} from 'navigation/navigationRef';

export const ChatScreen = ({route}: any) => {
  return (
    <View flex backgroundColor={COLORS.white} paddingHorizontal={20}>
      <View rowCenter marginTop={60} justifyContent="space-between">
        <Text fontSize={20} font="medium" color={COLORS.black}>
          Chat portal
        </Text>
        <View rowCenter>
          <Pressable
            square={40}
            justifyContent="center"
            alignItems="center"
            marginRight={10}
            radius={100}>
            <Bell />
          </Pressable>

          <Pressable
            square={40}
            justifyContent="center"
            alignItems="center"
            radius={100}
            backgroundColor={COLORS.primary}>
            <User color={'white'} />
          </Pressable>
        </View>
      </View>
      <View style={styles.search} rowCenter width={'100%'}>
        <Search
          style={{marginLeft: 10}}
          color={COLORS.darkElectricBlue}
          size={20}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor={COLORS.darkElectricBlue}
        />
      </View>
      <Pressable
        onPress={() => navigationRef.navigate('Message')}
        marginTop={20}
        paddingHorizontal={10}
        radius={10}
        paddingVertical={10}
        rowCenter
        borderColor={COLORS.brightGray}
        borderWidth={1}>
        <Pressable
          square={40}
          justifyContent="center"
          alignItems="center"
          radius={100}
          backgroundColor={COLORS.primary}>
          <User color={'white'} />
        </Pressable>
        <Text marginLeft={10}>User Demo</Text>
      </Pressable>
      {/* <FlatList  /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  search: {
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 20,
    borderColor: COLORS.brightGray,
    backgroundColor: COLORS.cultured,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
