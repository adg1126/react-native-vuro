import { View, Text, FlatList, Image, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import { getAllVideos, getLatestVideos } from '@/lib/appwrite';
import { useAppwrite } from '@/hooks/useAppwrite';
import VideoCard from '@/components/VideoCard';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>(''),
    [refresing, setRefresing] = useState<boolean>(false);

  const { data: videos, refetch } = useAppwrite(getAllVideos),
    { data: latestVideos } = useAppwrite(getLatestVideos);

  const handleChangeText = (e: string) => {};

  const onRefresh = async () => {
    setRefresing(true);
    await refetch();
    setRefresing(false);
  };

  return (
    <SafeAreaView className='bg-primary'>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={{ ...item }} />}
        ListHeaderComponent={() => (
          <View className='flex my-6 px-4 space-y-6'>
            <View className='flex justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Welcome back
                </Text>
                <Text className='font-psemibold text-2xl text-white'>User</Text>
              </View>

              <View className='mt-1.5'>
                <Image
                  source={images.logo}
                  className='w-9 h-10'
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput
              placeholder='Search for a video'
              value={searchTerm}
              handleChangeText={handleChangeText}
            />

            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-lg font-pregular text-gray-100 mb-3'>
                Latest Videos
              </Text>

              <Trending videos={latestVideos} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='Be the first one to upload a video'
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refresing}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  );
}
