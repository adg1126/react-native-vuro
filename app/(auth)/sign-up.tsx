import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';

import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';

export default function SignUp() {
  const [form, setForm] = useState({
      username: '',
      email: '',
      password: '',
    }),
    [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = () => {};

  return (
    <SafeAreaView className='primary w-full h-[100vh] flex flex-col justify-center items-center'>
      <View className='w-full flex flex-col px-4 gap-y-8'>
        <View className='flex flex-row items-center gap-x-1'>
          <Image
            source={images.logo}
            className='w-auto'
            resizeMode='contain'
          />
          <Text className='text-2xl font-pblack text-white'>Vuro</Text>
        </View>

        <Text className='text-2xl font-semibold text-white font-psemibold'>
          Sign up to Aora
        </Text>

        <View className='w-full flex flex-col gap-y-4'>
          <FormField
            title='Username'
            placeholder='Enter your username'
            value={form.username}
            handleChangeText={(e: any) => setForm({ ...form, username: e })}
            otherStyles='my-2'
            keyboardType='email-address'
          />
          <FormField
            title='Email'
            placeholder='Enter your email'
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles='my-2'
            keyboardType='email-address'
          />
          <FormField
            title='Password'
            placeholder='Enter your password'
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles='my-2'
          />
          <CustomButton
            title='Sign Up'
            handlePress={handleSignup}
            containerStyles='w-full my-4'
          />
        </View>

        <View className='w-[100vw] flex flex-row justify-center gap-2'>
          <Text className='text-lg text-gray-100 font-pregular'>
            Already hanve an account?
          </Text>
          <Link
            href='/(auth)/sign-in'
            className='text-lg font-psemibold text-secondary-100'
          >
            Sign In
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
