import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { list } from '../../../appwrite/database'

//Home Page

const Home = () => {

  const [data, setData] = useState();
  const [isLoading, setisLoading] = useState(0);

  async function fetchingData() {
    setisLoading(1);
    let tempData = await list();
    setData(tempData);
    // console.log(tempData); //Viewing the data
    setisLoading(0);
  }

  useEffect(() => {
    fetchingData();
  }, [])

  if(isLoading){
    return(
      <Text>Loading...</Text>
    )
  }

  return (
    <View>
        {
          data?.documents?.map((val) => {
            return <Text>{val.name}</Text>
          })
        }
    </View>
  )
}

export default Home