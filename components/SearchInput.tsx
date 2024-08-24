import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import icons from '@/constants/icons';

export default function SearchInput({
  value,
  placeholder,
  handleChangeText,
}: SearchInputProps) {
  return (
    <View className='w-full flex flex-row items-center h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary space-x-4'>
      <TextInput
        className='text-base mt-0.5 text-white flex-1 font-pregular'
        value={value}
        placeholder={placeholder}
        placeholderTextColor='#7b7b8b'
        onChangeText={handleChangeText}
      />

      <TouchableOpacity>
        <Image
          source={icons.search}
          className='w-5 h-5'
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  );
}
