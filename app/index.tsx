import React from 'react';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function index() {
  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-3xl font-pblack'>Vuro</Text>
      <StatusBar />
      <Link href='/(tabs)/home'>Home</Link>
    </View>
  );
}
