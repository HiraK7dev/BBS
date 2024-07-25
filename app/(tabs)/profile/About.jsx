import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useContext } from "react";
import { datacontext } from "../../../context/DataContext";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Card, Divider } from "react-native-paper";

const About = () => {
  const { currentVersion } = useContext(datacontext);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card style={styles.Card}>
          <Card.Content>
            <Text style={styles.appInfoTitle}>APP INFO</Text>
            <View style={styles.group}>
              <Text style={styles.titles}>App Name: </Text>
              <Text style={styles.normText}>BBS-Temple-App</Text>
            </View>
            <View style={styles.group}>
              <Text style={styles.titles}>Developer: </Text>
              <Text style={styles.normText}>Hirakjyoti Bhattacharjya</Text>
            </View>
            <View style={styles.group}>
              <Text style={styles.titles}>Version: </Text>
              <Text style={styles.normText}>{currentVersion}</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.Card}>
          <Card.Content>
            <Text style={styles.donationText}>
              এই এপটো শ্ৰী মুকুট ভট্টাচাৰ্যই পিতৃ প্ৰয়াত পদুম ভট্টাচাৰ্য আৰু
              মাতৃ প্ৰয়াত মুক্ত ভট্টাচাৰ্যৰ নামত আগবঢ়াইছে ।
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.Card}>
          <Card.Content>
            <Text style={styles.shlokaText}>
              शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं विश्वाधारं गगनसदृशं मेघवर्ण
              शुभाङ्गम् । लक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यम् वन्दे
              विष्णुं भवभयहरं सर्वलोकैकनाथम् ॥
            </Text>
            <Divider bold="true" style={styles.lineDivider} />
            <Text style={styles.shlokaText}>
              ৰূপত শান্তিপূৰ্ণ, নাগৰ ওপৰত শয়ন কৰি থকা, পদুম-নাভিৰে,
              বিশ্বব্ৰহ্মাণ্ডৰ আধাৰ, দেৱতাৰ প্ৰভু, আৰু আকাশৰ সদৃশ, মেঘৰ ৰং আৰু
              শুভ অংগ। সকলো ঐশ্বৰ্যপ্ৰেমী, যাৰ চকু পদুমৰ দৰে, যাক যোগীসকলে ধ্যান
              কৰিব পাৰে, ভগৱান বিষ্ণুলৈ শ্ৰদ্ধাৰে সোঁৱৰিছো।
            </Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  appInfo: {
    height: "20%",
    width: "86%",
    backgroundColor: "white",
    elevation: 5,
    padding: 30,
    borderRadius: 25,
    justifyContent: "center",
  },
  appInfoTitle: {
    fontSize: RFPercentage(3),
    fontWeight: "700",
    marginBottom: 8,
  },
  shlokaText: {
    textAlign: "center",
    fontSize: RFPercentage(2.8),
  },
  group: {
    flexDirection: "row",
  },
  titles: {
    fontWeight: "600",
    fontSize: RFPercentage(1.8),
  },
  normText: {
    fontSize: RFPercentage(1.8),
  },
  lineDivider: {
    backgroundColor: "#995D81",
    marginTop: 10,
    marginBottom: 10,
    height: 1,
    width: "90%",
  },
  donationText: {
    fontSize: RFPercentage(2.8),
    textAlign: "center",
    fontWeight: "600",
  },
  Card: {
    marginBottom: 20,
    padding: 15,
  },
});

export default About;
