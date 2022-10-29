import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import { StyleSheet, View, TextInput, Button } from "react-native";
import { FlatList } from "react-native";
import GoalItem from "./src/components/GoalItem";
import GoalInput from "./src/components/GoalInput";

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [goals, setGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  function addGoalHandler(enteredGoal) {
    setGoals((currentGoals) => [
      ...currentGoals,
      {
        text: enteredGoal,
        id: Math.random().toString(),
      },
    ]);
    endAddGoalHandler();
  }
  function deleteGoalHandler(id) {
    setGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== id);
    });
  }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }
  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  return (
    <>
      <StatusBar barStyle="light" />
      <View style={styles.appContainer}>
        <Button
          title="add new goal"
          color="#5e0acc"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={goals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={true}
          ></FlatList>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#312b6b",
  },
  goalsContainer: {
    flex: 5,
  },
});
