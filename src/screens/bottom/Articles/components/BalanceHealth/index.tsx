import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useGetArticles} from 'queries/articles';
import {TypeArticles} from 'models/articles';
import Item from './item';

const BalanceHealth = () => {
  // const balanceHealth = useGetArticles(TypeArticles.BALANCE_HEALTH);
  // console.log('🚀 ~ balanceHealth:', balanceHealth);
  const {data, isPending} = useGetArticles({type: undefined});
  return (
    <ScrollView
      horizontal
      style={{marginTop: 10}}
      showsHorizontalScrollIndicator={false}>
      {data?.list.map(item => (
        <Item key={item._id} item={item} />
      ))}
    </ScrollView>
  );
};

export default BalanceHealth;
