import React, { useState } from 'react';

import * as Animatable from 'react-native-animatable';

import { FlatList, View } from 'react-native';
import EmptyState from './EmptyState';

import VideoPlayer from './VideoPlayer';

const zoomIn = {
    0: { scale: 0.9, opacity: 1 },
    1: { scale: 1.1, opacity: 1 },
  },
  zoomOut = {
    0: { scale: 1.1, opacity: 1 },
    1: { scale: 0.9, opacity: 1 },
  };

const TrendingItem = ({
  activeItemKey,
  item,
  index,
  arrLength,
}: TrendingItemProps) => {
  return (
    <Animatable.View
      className={`mr-5 ${index === arrLength - 1 && 'pr-10'}`}
      animation={activeItemKey === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      <View className='w-52 h-72 rounded-[35px] flex items-center justify-center'>
        <VideoPlayer
          videoUrl={item.video}
          thumbnail={item.thumbnail}
          videoPlayerStyles='rounded-[35px] bg-white/10'
          thumbnailStyles='rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
        />
      </View>
    </Animatable.View>
  );
};

export default function Trending({ videos }: { videos: any }) {
  const [activeItem, setActiveItem] = useState(videos[1]);

  const handleChangeActiveItem = ({
    viewableItems,
  }: {
    viewableItems: ViewableItemProps[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      className='p-8'
      data={videos}
      keyExtractor={(item) => item.$id}
      renderItem={({ item, index }) => (
        <TrendingItem
          activeItemKey={activeItem}
          item={item}
          index={index}
          arrLength={videos.length}
        />
      )}
      onViewableItemsChanged={handleChangeActiveItem}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
      ListEmptyComponent={() => (
        <EmptyState
          title='No Videos Found'
          subtitle='Be the first one to upload a video'
        />
      )}
    />
  );
}
