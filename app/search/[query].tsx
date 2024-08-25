import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';
import VideoCard from '@/components/VideoCard';
import { useLocalSearchParams } from 'expo-router';

import { getVideo } from '@/lib/appwrite';
import { useAppwrite } from '@/hooks/useAppwrite';

export default function Search() {
  const { query } = useLocalSearchParams();

  const { data: videos, refetch } = useAppwrite(() => getVideo(`${query}`));

  useEffect(() => {
    refetch();
  }, [query]);

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
                  Search Results
                </Text>
                <Text className='font-psemibold text-2xl text-white'>
                  {query}
                </Text>
              </View>

              <View className='mt-1.5'>
                <Image
                  source={images.logo}
                  className='w-9 h-10'
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput initialQuery={`${query}`} />
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
  );
}
