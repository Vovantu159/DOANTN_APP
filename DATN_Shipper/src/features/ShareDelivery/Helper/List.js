import React, {useEffect, useState, useRef, useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Item from './Item';
const itemHeight = 100;
const List = ({data, getItemList}) => {
  console.log('Re-render list');

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <Item item={item} index={index} onPressItem={() => getItemList(item)} />
      );
    },
    [getItemList],
  );
  const keyExtractor = useCallback((item, index) => `${index}`, []);
  const getItemLayout = useCallback(
    (data, index) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    }),
    [],
  );
  return (
    <FlatList
      data={data}
      contentContainerStyle={styles.list}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      maxToRenderPerBatch={15}
      updateCellsBatchingPeriod={50}
      onEndReachedThreshold={0.75}
      // onEndReached={handleLoadMore}
      getItemLayout={getItemLayout}
    />
  );
};
export default React.memo(List);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  item: {
    height: itemHeight,
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  img: {width: 80, height: 80, alignSelf: 'center', marginLeft: 20},
  contentItem: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  txtItem: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 5,
  },
});
