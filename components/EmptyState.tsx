import { View, Text, Image } from 'react-native';
import React from 'react';
import images from '@/constants/images';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

export default function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <View className='flex justify-center items-center px-4'>
      <Image
        source={images.empty}
        className='w-[270px] h-[215px]'
        resizeMode='contain'
      />

      <Text className='text-xl text-center font-psemibold text-white mt-2'>
        {title}
      </Text>
      <Text className='font-psemibold text-sm text-gray-100'>{subtitle}</Text>

      <CustomButton
        containerStyles='w-full my-5'
        title='Create a video'
        handlePress={() => router.push('/create')}
      />
    </View>
  );
}
