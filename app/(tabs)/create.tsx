import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';

import icons from '@/constants/icons';
import { ResizeMode, Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';
import { createVideo } from '@/lib/appwrite';

export default function Create() {
  const { user } = useGlobalContext();

  const [uploading, setUploading] = useState<boolean>(false);

  const [form, setForm] = useState<UploadField>({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
    userId: '',
  });

  const { title, video, thumbnail, prompt } = form;

  const openPicker = async (selectType: 'video' | 'image') => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === 'image'
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!res.canceled) {
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: res.assets[0] });
      }

      if (selectType === 'video') {
        setForm({ ...form, video: res.assets[0] });
      }
    }
  };

  const handleSubmit = async () => {
    if (!prompt || !title || !thumbnail || !video) {
      return Alert.alert('Please fill in all the fields');
    }

    try {
      await createVideo({ ...form, userId: user!['$id'] });

      Alert.alert('Success', 'Video uploaded successfully');
      router.push('/home');
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl text-white font-psemibold'>Upload video</Text>
        <FormField
          title='Video Title'
          value={form.title}
          placeholder='Enter video title'
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles='mt-10'
        />

        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className='w-full h-64 rounded-2xl'
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className='w-1/2 h-1/2'
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode='cover'
                className='w-full h-64 rounded-2xl'
              />
            ) : (
              <View className='w-full h-20 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex flex-row space-x-2'>
                <Image
                  source={icons.upload}
                  resizeMode='contain'
                  className='w-7 h-7'
                />
                <Text className='text-sm text-gray-100 font-pmedium'>
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title='AI Prompt'
          value={form.prompt}
          placeholder='The prompt you used to create this video'
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles='mt-7'
        />

        <CustomButton
          title='Submit & Publish'
          handlePress={handleSubmit}
          containerStyles='mt-7'
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
