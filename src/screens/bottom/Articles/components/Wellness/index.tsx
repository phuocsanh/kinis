import {ScrollView} from 'react-native';
import React from 'react';
import {useGetArticles} from 'queries/articles';
import {TypeArticles} from 'models/articles';
import Item from './item';
import {View} from 'components/base';

const Wellness = () => {
  const {data, isPending} = useGetArticles({type: undefined});
  return (
    <View style={{marginTop: 10, width: '100%'}}>
      {data?.list.map(item => (
        <Item key={item._id} item={item} />
      ))}
    </View>
  );
};

export default Wellness;
