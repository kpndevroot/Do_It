import { StyleSheet, View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";

function GoalItem(props) {
  console.log({ insideDate: props.data.item.date });
  const [remainTime, setRemainTime] = useState({
    diffMs: 0,
    diffDays: 0,
    diffHrs: 0,
    diffMins: 0,
  });
  useEffect(() => {
    console.log("hi iam loaded");
    dateConverter();
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
    <Pressable
      android_ripple={{ color: "#210644" }}
      onPress={props.onDeleteItem.bind(this, props.id)}
      style={({ pressed }) => pressed && styles.pressedItem}
    >
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>
          {props.text + " " + props.data.item.date.toDateString()} in{" "}
          {remainTime.diffDays > 0
            ? remainTime.diffDays +
              " days" +
              remainTime.diffHrs +
              " hours" +
              remainTime.mins +
              " minutes"
            : remainTime.diffDays === 0 && remainTime.diffHrs > 0
            ? remainTime.diffHrs + " hours" + remainTime.mins + " minutes"
            : remainTime.diffDays === 0 &&
              remainTime.diffHrs === 0 &&
              remainTime.diffMins > 0
            ? remainTime.diffMins + " minutes"
            : remainTime.diffSeconds + " seconds"}
        </Text>
      </View>
    </Pressable>
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
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "#fff",
    padding: 8,
  },
});
