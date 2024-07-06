import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Icon } from 'react-native-paper';
import { datacontext } from '../../../context/DataContext';
import CustomHeader from '../../../components/CustomHeader';

const User = () => {
    const userId = useLocalSearchParams();

    const { data } = useContext(datacontext);

  return (
    <View>
        <Stack.Screen
            options={{
                headerTitle: props => <CustomHeader title={data.documents[userId.user]?.name} {...props}/>
              }}
            />
      <Text>{userId.user}</Text>
    </View>
  )
}

export default User