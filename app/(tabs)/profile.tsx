import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptyState from '@/components/EmptyState';
import VideoCard from '@/components/VideoCard';

import { getUserVideos, signOut } from '@/lib/appwrite';
import { useAppwrite } from '@/hooks/useAppwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import icons from '@/constants/icons';
import InfoBox from '@/components/InfoBox';
import { router } from 'expo-router';

export default function Profile() {
  const { user, handleSetUser, handleSetIsSignedIn } = useGlobalContext();

  const { data: videos } = useAppwrite(() => getUserVideos(`${user!['$id']}`));

  const handleSignout = async () => {
    await signOut();
    handleSetUser(null);
    handleSetIsSignedIn(false);

    router.replace('/(auth)/sign-up');
  };

  return (
    user !== null && (
      <SafeAreaView className='bg-primary'>
        <FlatList
          data={videos}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <VideoCard video={{ ...item }} />}
          ListHeaderComponent={() => (
            <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
              <TouchableOpacity
                className='w-full items-end mb-10'
                onPress={handleSignout}
              >
                <Image
                  source={icons.logout}
                  resizeMode='contain'
                  className='w-6 h-6'
                />
              </TouchableOpacity>
              <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
                <Image
                  source={{ uri: user!['avatar'] }}
                  className='w-[90%] h-[90%] rounded-lg'
                  resizeMode='cover'
                />
              </View>

              <InfoBox
                title={user!['username']}
                containerStyles='mt-5'
                titleStyles='text-lg'
              />

              <View className='mt-5 flex-row'>
                <InfoBox
                  title={videos.length || 0}
                  subtitle='Videos'
                  containerStyles='mr-10'
                  titleStyles='text-xl'
                />
                <InfoBox
                  title='1.2k'
                  subtitle='Followers'
                  titleStyles='text-lg'
                />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title='No Videos Found'
              subtitle='Be the first one to upload a video'
            />
          )}
        />
      </SafeAreaView>
    )
  );
}
