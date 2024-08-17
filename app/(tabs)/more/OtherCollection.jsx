import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { datacontext } from '../../../context/DataContext'
import { Button, Card, DataTable, Divider, IconButton, TextInput } from 'react-native-paper';
import { userContextData } from '../../../context/UserContext';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { addOtherCollection, deleteOtherCollection } from '../../../appwrite/other_collection';
import Toast from 'react-native-toast-message';

const OtherCollection = () => {

  const { otCollection } = useContext(datacontext);
  const { user } = useContext(userContextData);

  const [total, setTotal] = useState(0);
  const [body, setBody] = useState(null);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    let tempTotal = 0;
    for (const element of otCollection) {
      tempTotal += element.amount;
    }
    setTotal(tempTotal)
  }, [otCollection])

  async function addData() {
    if (body == null || amount == null) {
      Toast.show({
        type: "error",
        text1: "Invalid Input!",
      });
    } else {
      const res = await addOtherCollection(body, parseInt(amount));
      if (res == `error`) {
        Toast.show({
          type: "error",
          text1: "Something went wrong!",
          text2: "Try again later",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Update Successful",
        });
      }
      setBody(null);
      setAmount(null);
    }
  }

  async function deleteData($id) {
    const res = await deleteOtherCollection($id);
    if (res == `error`) {
      Toast.show({
        type: "error",
        text1: "Something went wrong!",
        text2: "Try again later",
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Deletion Successful",
      });
    }
  }

  return (
    <ScrollView>
      {/* adminView */}
      {
        user.labels[0] == `admin` ?
          <>
            <View style={styles.adminContainer}>
              <Card style={styles.adminCard}>
                <TextInput
                  placeholder='Description'
                  mode='outlined'
                  style={styles.adminInput}
                  value={body}
                  onChangeText={setBody}
                />
                <TextInput
                  placeholder='Amount'
                  mode='outlined'
                  style={styles.adminInput}
                  value={amount}
                  keyboardType="number-pad"
                  onChangeText={setAmount}
                />
                <Button mode='contained' style={styles.adminButton}
                  onPress={addData}>ADD</Button>
              </Card>
            </View>
          </> :
          <></>
      }
      <View style={styles.container}>
        {
          otCollection.map((item) => {
            return (
              <Card style={styles.card} key={item.$id}>
                <Card.Content>
                  <Text>{item.body}</Text>
                </Card.Content>
                <Card.Actions>
                  <Text style={styles.amountText}>₹ {item.amount}</Text>
                  {
                    user.labels[0] == `admin` ?
                      <>
                        <IconButton
                          icon="trash-can"
                          iconColor="white"
                          containerColor="#FE938C"
                          mode="contained"
                          style={styles.deleteButton}
                          size={15}
                          onPress={() => {
                            deleteData(item.$id);
                          }}
                        />
                      </> :
                      <></>
                  }
                </Card.Actions>
              </Card>
            )
          })
        }
        <Divider style={styles.divider} />
        <Card style={styles.cardTotal}>
          <Card.Content>
            <Text style={styles.TotalText}>Total - ₹ {total}</Text>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.lastBlank} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  card: {
    margin: 5,
    padding: 5
  },
  cardTotal: {
    margin: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  amountText: {
    fontSize: RFPercentage(2.2),
    fontWeight: 700
  },
  TotalText: {
    letterSpacing: 1.8,
    fontSize: RFPercentage(2.3)
  },
  divider: {
    marginTop: 10,
    marginBottom: 10
  },
  adminContainer: {
    padding: 10,
    height: 300,
  },
  adminCard: {
    margin: 5,
    padding: 20,
    height: '100%',
    justifyContent: 'center'
  },
  adminButton: {
    borderRadius: 5,
  },
  adminInput: {
    marginBottom: 10
  },
  lastBlank: {
    height: 20
  },
  deleteButton: {
    margin: 10
  }
})

export default OtherCollection