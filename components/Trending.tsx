import { View, Text, FlatList } from 'react-native';
import React from 'react';
import EmptyState from './EmptyState';

export default function Trending({ posts }: { posts: any }) {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text className='text-3xl text-white'>{item.id}</Text>
      )}
      horizontal
      ListEmptyComponent={() => (
        <EmptyState
          title='No Videos Found'
          subtitle='Be the first one to upload a video'
        />
      )}
    />
  );
}
