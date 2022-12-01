import React, {Component} from 'react';
import {} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scWidth} from '../../constants/styles';

const Index = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        marginHorizontal={20}
        paddingHorizontal={5}
        marginVertical={20}>
        <SkeletonPlaceholder.Item width={80} height={80} borderRadius={40} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item
            width={scWidth * 0.6}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={80}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={120}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        marginHorizontal={20}
        paddingHorizontal={5}
        marginVertical={20}>
        <SkeletonPlaceholder.Item width={80} height={80} borderRadius={40} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item
            width={scWidth * 0.6}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={80}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={120}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        marginHorizontal={20}
        paddingHorizontal={5}
        marginVertical={20}>
        <SkeletonPlaceholder.Item width={80} height={80} borderRadius={40} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item
            width={scWidth * 0.6}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={80}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={120}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        marginHorizontal={20}
        paddingHorizontal={5}
        marginVertical={20}>
        <SkeletonPlaceholder.Item width={80} height={80} borderRadius={40} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item
            width={scWidth * 0.6}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={80}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={120}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
export default React.memo(Index);
