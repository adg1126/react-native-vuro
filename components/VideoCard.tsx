import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import icons from '@/constants/icons';

import { Video, ResizeMode } from 'expo-av';

export default function VideoCard({
  video: {
    title,
    thumbnail,
    video,
    users: { username, avatar },
  },
}: {
  video: VideoDoc;
}) {
  const [play, setPlay] = useState<boolean>(false);

  const handlePlayVideo = () => {
    setPlay(true);
    // play video here
  };

  return (
    <View className='flex flex-col items-center px-4 mb-14'>
      <View className='flex flex-row gap-3 items-start'>
        <View className='flex flex-row flex-1 justify-center items-center'>
          <View className='w-[46px] h-[46px] rounded-lg border border-secondary-100 justify-center items-center p-.5'>
            <Image
              source={{ uri: avatar }}
              className='w-full h-full rounded-lg'
              resizeMode='cover'
            />
          </View>

          <View className='flex flex-1 justify-center ml-3 gap-y-1'>
            <Text
              className='text-white font-psemibold text-sm'
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text className='text-gray-100 text-xs font-pregular'>
              {username}
            </Text>
          </View>
        </View>

        <View className='pt-2'>
          <Image
            source={icons.menu}
            className='w-5 h-5'
            resizeMode='contain'
          />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className='w-full h-60 rounded-xl mt-3'
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
          className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
          activeOpacity={0.7}
          onPress={handlePlayVideo}
        >
          <Image
            source={{ uri: thumbnail }}
            className='w-full h-full rounded-xl mt-3'
            resizeMode='cover'
          />
          <Image
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
