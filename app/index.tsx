import React from 'react';
import 'react-native-url-polyfill/auto';

import { Redirect, router } from 'expo-router';

import { Image, ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import CustomButton from '@/components/CustomButton';

export default function index() {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full items-center px-4'>
          <View className=' flex flex-row items-center justify-center gap-x-1'>
            <Image
              source={images.logo}
              className='w-auto h-[130px]'
              resizeMode='contain'
            />
            <Text className='text-2xl font-pblack text-white'>Vuro</Text>
          </View>
          <Image
            source={images.cards}
            className='max-w-[380xp] w-full h-[300px]'
            resizeMode='contain'
          />
          <View className='relative mt-5'>
            <Text className='text-3xl text-white font-bold text-center'>
              Discover endlesss posibilities with{' '}
              <Text className='text-secondary-200'>Vuro</Text>
            </Text>
            <Image
              source={images.path}
              className='w-[75px] h-[15px] absolute -bottom-2 -right-2'
              resizeMode='contain'
            />
          </View>

          <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Vuro
          </Text>

          <CustomButton
            title='Continue with email'
            handlePress={() => router.push('/sign-in')}
            containerStyles='w-full mt-7'
          />
        </View>
      </ScrollView>

      <StatusBar
        backgroundColor='#161622'
        style='light'
      />
    </SafeAreaView>
  );
}
