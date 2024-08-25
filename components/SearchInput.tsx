import React, { useState } from 'react';

import icons from '@/constants/icons';
import { router, usePathname } from 'expo-router';

import { TextInput, TouchableOpacity, Image, Alert, View } from 'react-native';

export default function SearchInput({ initialQuery }: SearchInputProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');

  const handleChangeText = (e: string) => {
    setQuery(e);
  };

  const handleSearchSubmit = () => {
    if (!query) {
      Alert.alert('Error', 'Please enter a search query.');
    }

    if (pathname.startsWith('/search')) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`);
    }
  };

  return (
    <View className='flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary'>
      <TextInput
        className='text-base mt-0.5 text-white flex-1 font-pregular'
        value={query}
        placeholder='Search a video topic'
        placeholderTextColor='#CDCDE0'
        onChangeText={handleChangeText}
      />

      <TouchableOpacity onPress={handleSearchSubmit}>
        <Image
          source={icons.search}
          className='w-5 h-5'
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  );
}
