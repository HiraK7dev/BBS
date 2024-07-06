import { Stack, useLocalSearchParams } from 'expo-router';

export default function Layout() {
  const userId = useLocalSearchParams();
  return (
    <Stack initialRouteName='index'>
        <Stack.Screen name='[user]'/>
        <Stack.Screen name='index' options={{
            headerTitle: 'Home'
        }}/>
    </Stack>
  );
}