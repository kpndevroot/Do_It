import { StyleSheet, View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import DoubleClick from "react-native-double-tap";
function GoalItem(props) {
  console.log({ insideDate: props.data.item.date });
  const [tap, setTap] = useState(false);
  const [remainTime, setRemainTime] = useState({
    diffMs: 0,
    diffDays: 0,
    diffHrs: 0,
    diffMins: 0,
  });
  useEffect(() => {
    dateConverter();
    const interval = setInterval(() => {
      console.log("hi iam loaded");
      dateConverter();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const dateConverter = () => {
    var diffMs = props.data.item.date - new Date(); // milliseconds between now & Christmas
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    setRemainTime({
      diffMs: props.data.item.date - new Date(),
      diffSeconds: diffMs / 1000,
      diffDays: Math.floor(diffMs / 86400000), // days
      diffHrs: Math.floor((diffMs % 86400000) / 3600000), // hours,
      diffMins: Math.round(((diffMs % 86400000) % 3600000) / 60000), // minutes,
    });
    console.log(
      diffDays +
        " days, " +
        diffHrs +
        " hours, " +
        diffMins +
        " minutes until Christmas =)"
    );
  };
  return (
    // <Pressable
    //   android_ripple={{ color: "#210644" }}
    //   onPress={props.onDeleteItem.bind(this, props.id)}
    //
    // >
    <DoubleClick
      doubleTap={props.onDeleteItem.bind(this, props.id)}
      singleTap={() => {
        setTap(true);
      }}
      delay={1000}
      style={({ pressed }) => pressed && styles.pressedItem}
    >
      {tap == true ? (
        <View style={styles.goalItemTap}>
          <Text style={styles.goalTextTap}>
            {props.text + " "} <Text style={styles.inText}>in</Text>{" "}
            {remainTime.diffDays > 0 ? (
              <Text style={styles.days}>
                {remainTime.diffDays} days {remainTime.diffHrs} hours
                {remainTime.diffMins} minutes
              </Text>
            ) : remainTime.diffDays === 0 && remainTime.diffHrs > 0 ? (
              <Text style={styles.hours}>
                {remainTime.diffHrs} hours {remainTime.diffMins} minutes
              </Text>
            ) : remainTime.diffDays === 0 &&
              remainTime.diffHrs === 0 &&
              remainTime.diffMins > 0 ? (
              <Text style={styles.min}>{remainTime.diffMins} minutes </Text>
            ) : remainTime.diffDays === 0 &&
              remainTime.diffHrs === 0 &&
              remainTime.diffMins === 0 &&
              remainTime.diffSeconds > 0 ? (
              <Text style={styles.seconds}>
                {Math.round(remainTime.diffSeconds)}
                seconds
              </Text>
            ) : (
              <Text style={styles.procrastination}> procrastination </Text>
            )}
          </Text>
        </View>
      ) : (
        <View style={styles.goalItem}>
          <Text style={styles.goalText}>
            {props.text + " "} <Text style={styles.inText}>in</Text>{" "}
            {remainTime.diffDays > 0 ? (
              <Text style={styles.days}>
                {remainTime.diffDays} days {remainTime.diffHrs} hours
                {remainTime.diffMins} minutes
              </Text>
            ) : remainTime.diffDays === 0 && remainTime.diffHrs > 0 ? (
              <Text style={styles.hours}>
                {remainTime.diffHrs} hours {remainTime.diffMins} minutes
              </Text>
            ) : remainTime.diffDays === 0 &&
              remainTime.diffHrs === 0 &&
              remainTime.diffMins > 0 ? (
              <Text style={styles.min}>{remainTime.diffMins} minutes </Text>
            ) : remainTime.diffDays === 0 &&
              remainTime.diffHrs === 0 &&
              remainTime.diffMins === 0 &&
              remainTime.diffSeconds > 0 ? (
              <Text style={styles.seconds}>
                {Math.round(remainTime.diffSeconds)}
                seconds
              </Text>
            ) : (
              <Text style={styles.procrastination}> procrastination </Text>
            )}
          </Text>
        </View>
      )}
    </DoubleClick>
    // </Pressable>
  );
}

export default GoalItem;
const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalItemTap: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "#fff",
    padding: 8,
  },
  goalTextTap: {
    color: "#000",
    padding: 8,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  inText: {
    color: "green",
  },
  days: { color: "yellow" },
  hours: { color: "orange" },
  procrastination: {
    color: "red",
  },
  min: {
    color: "cyan",
  },
  seconds: {
    color: "blue",
  },
});
