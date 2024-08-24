import React, { useState } from 'react';

import * as Animatable from 'react-native-animatable';

import {
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import EmptyState from './EmptyState';
import icons from '@/constants/icons';

import { ResizeMode, Video } from 'expo-av';

const zoomIn = {
    0: { scale: 0.9, opacity: 1 },
    1: { scale: 1.1, opacity: 1 },
  },
  zoomOut = {
    0: { scale: 1.1, opacity: 1 },
    1: { scale: 0.9, opacity: 1 },
  };

const TrendingItem = ({ activeItemKey, item }: TrendingItemProps) => {
  const [play, setPlay] = useState<boolean>(false);

  const handlePlayVideo = () => {
    setPlay(true);
    // play video here
  };

  return (
    <Animatable.View
      className='mr-5'
      animation={activeItemKey === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status: any) => {
            if (status.isLoaded) {
              if (status.didJustFinish) setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className='relative justify-center items-center'
          activeOpacity={0.7}
          onPress={handlePlayVideo}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
            resizeMode='cover'
          />

          <Image
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
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
      data={videos}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem
          activeItemKey={activeItem}
          item={item}
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
