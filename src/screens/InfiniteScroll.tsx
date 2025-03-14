import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import {useGetPostsQuery} from '../store/postSlice/postSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fetchImages} from '../utils/helper';

// Define the interface for your post item
interface PostItem {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const InfiniteScrollList = () => {
  const padding = useSafeAreaInsets();
  const [page, setPage] = useState(1);
  const {data, error, isFetching} = useGetPostsQuery(page);

  const loadMore = useCallback(() => {
    if (!isFetching) {
      setPage(prev => prev + 1);
    }
  }, [isFetching]);

  if (isFetching && page === 1)
    return <ActivityIndicator style={styles.loader} size="large" />;

  if (error)
    return (
      <Text style={styles.error}>
        Error:{' '}
        {error && 'message' in error ? error.message : 'Something went wrong'}
      </Text>
    );

  const renderItem = ({item, index}: ListRenderItemInfo<PostItem>) => (
    <View style={styles.photoContainer}>
      <Image source={{uri: fetchImages(index)}} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View
      style={{
        paddingTop: padding.top,
        paddingLeft: 12,
        paddingRight: 12,
        flex: 1,
      }}>
      <Text style={styles.heading}>Infinite scroll app by Haseeb Ghaffar</Text>
      <FlatList<PostItem>
        data={data || []}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        onEndReached={loadMore}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#bf2c2e',
    padding: 1,
    height: 40,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  photoContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderBlockColor: '#ccc',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
    flexShrink: 1,
  },
});

export default InfiniteScrollList;
