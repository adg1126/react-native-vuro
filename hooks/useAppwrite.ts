import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

export function useAppwrite(fn: any) {
  const [data, setData] = useState<any>([]),
    [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);

    try {
      const res = await fn();

      setData(res);
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function refetch() {
    fetchData();
  }

  return { data, isLoading, refetch };
}
