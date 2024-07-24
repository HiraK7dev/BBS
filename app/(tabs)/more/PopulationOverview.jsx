import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { datacontext } from "../../../context/DataContext";
import { PieChart } from "react-native-gifted-charts";

const PopulationOverview = () => {
  const { familyDetails } = useContext(datacontext);

  const [totMale, setTotMale] = useState();
  const [totFemale, setTotFemale] = useState();

  const pieData = [
    {
      value: totMale,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      focused: true,
    },
    { value: totFemale, color: "#93FCF8", gradientCenterColor: "#3BE9DE" },
  ];

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

  function calculatePercentage(num, total) {
    return (num / total) * 100;
  }

  useEffect(() => {
    calculatingFamilyDetails();
  }, []);

  return (
      <View style={styles.container}>
        <View style={styles.details}>
          <Text style={styles.titleText}>CENSUS INSIGHTS</Text>
          {/* PieChart */}
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={"#232B5D"}
            centerLabelComponent={() => {
              return (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{ fontSize: 22, color: "white", fontWeight: "bold" }}
                  >
                    {totMale + totFemale}
                  </Text>
                  <Text style={{ fontSize: 14, color: "white" }}>
                    Total
                  </Text>
                </View>
              );
            }}
          />

          <View style={styles.colorDistinguisher}>
            <View style={styles.femaleView}>
              <Text style={styles.viewText}>FEMALES</Text>
              <Text style={styles.percentText}>
                {calculatePercentage(totFemale, totFemale + totMale).toFixed(1)}
                %
              </Text>
            </View>
            <View style={styles.maleView}>
              <Text style={styles.viewText}>MALES</Text>
              <Text style={styles.percentText}>
                {calculatePercentage(totMale, totFemale + totMale).toFixed(1)}%
              </Text>
            </View>
          </View>
        </View>
            <View style={styles.divider}></View>
        <View style={styles.summery}>
          <View style={styles.summeryLayout}>
            <Text style={styles.totText}>{totFemale}</Text>
            <Text style={styles.summeryText}>FEMALES</Text>
          </View>
          <View style={styles.summeryLayout}>
            <Text style={styles.totText}>{totMale}</Text>
            <Text style={styles.summeryText}>MALES</Text>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    width: '100%',
    height: '2%'
  },
  totText: {
    fontSize: 60,
    fontWeight: "500",
  },
  titleText: {
    fontSize: 10,
    letterSpacing: 3.5,
    fontWeight: "400",
  },
  details: {
    height: "65%",
    width: "86%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 15,
    padding: 20,
    borderRadius: 25,
  },
  colorDistinguisher: {
    width: "100%",
    height: "18%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
  },
  maleView: {
    width: "49%",
    height: "100%",
    // backgroundColor: "#724CF9",
    borderColor: "#006DFF",
    borderWidth: 2,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  femaleView: {
    width: "49%",
    height: "100%",
    // backgroundColor: "#CA7DF9",
    borderColor: "#3BE9DE",
    borderWidth: 2,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  viewText: {
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 1.5,
  },
  percentText: {
    fontSize: 30,
    fontWeight: "700",
  },
  summery: {
    height: "20%",
    width: "86%",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 15,
    padding: 20,
    borderRadius: 25,
  },
  summeryLayout: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'pink'
  },
  summeryText: {
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: "700",
  },
});

export default PopulationOverview;
