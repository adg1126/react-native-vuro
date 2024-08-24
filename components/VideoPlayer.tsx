import React, { useState } from 'react';
import { Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

import icons from '@/constants/icons';

export default function VideoPlayer({
  videoUrl,
  thumbnail,
  videoPlayerStyles,
  thumbnailStyles,
}: VideoPlayerProps) {
  const [play, setPlay] = useState<boolean>(false);

  const handlePlayVideo = () => {
    setPlay(true);
    // play video here
  };

  return play ? (
    <Video
      source={{ uri: videoUrl }}
      className={`w-full h-full ${videoPlayerStyles}`}
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
      className='w-full h-full relative justify-center items-center'
      activeOpacity={0.7}
      onPress={handlePlayVideo}
    >
      <Image
        source={{ uri: thumbnail }}
        className={`w-full h-full ${thumbnailStyles}`}
        resizeMode='cover'
      />

      <Image
        source={icons.play}
        className='w-12 h-12 absolute'
        resizeMode='contain'
      />
    </TouchableOpacity>
  );
}
