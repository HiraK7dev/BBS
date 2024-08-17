import { Stack, useLocalSearchParams } from 'expo-router';

export default function Layout() {

  return (
    <Stack initialRouteName='index'>
        <Stack.Screen name='edit' options={{
            headerShown: false
        }}/>
        <Stack.Screen name='PopulationOverview' options={{
            headerTitle: 'Population Overview'
        }}/>
        <Stack.Screen name='SuspendedMembers' options={{
            headerTitle: 'Suspended Members'
        }}/>
        <Stack.Screen name='TotalCollection' options={{
            headerTitle: 'Total Collection'
        }}/>
        <Stack.Screen name='OtherCollection' options={{
            headerTitle: 'Other Collection'
        }}/>
        <Stack.Screen name='Add' options={{
            headerTitle: 'Add Member'
        }}/>
        <Stack.Screen name='index' options={{
            headerTitle: 'More'
        }}/>
    </Stack>
  );
}