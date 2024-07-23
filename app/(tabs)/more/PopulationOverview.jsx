import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { datacontext } from '../../../context/DataContext'

const PopulationOverview = () => {
    const { familyDetails } = useContext(datacontext);

    const [totMale, setTotMale] = useState();
    const [totFemale, setTotFemale] = useState();

    function calculatingFamilyDetails() {
        let male = null;
        let female = null;
        familyDetails.forEach((curr) => {
            male = male + Number(curr.male);
            female = female + Number(curr.female);
        });
        setTotMale(male);
        setTotFemale(female);
    }

    useEffect(() => {
        calculatingFamilyDetails();
    }, [])

  return (
    <View>
      <Text>{totMale}</Text>
      <Text>{totFemale}</Text>
    </View>
  )
}

export default PopulationOverview