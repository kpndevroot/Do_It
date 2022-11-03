import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
function GoalInput(props) {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [enteredDate, setEnteredDate] = useState(new Date());

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
    setEnteredDate(date);
  };
  function goalInputHandler(enteredText) {
    setEnteredGoal(enteredText);
  }

  function addGoalHandler() {
    props.onAddGoal(enteredGoal, enteredDate);
    setEnteredGoal("");
    // setEnteredDate(new Date());
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../../asset/images/goalWhite.png")}
        />
        <View style={styles.inputs}>
          <TextInput
            style={styles.textInput}
            placeholder="Goal Name"
            onChangeText={goalInputHandler}
            value={enteredGoal}
          />

          <TouchableOpacity onPress={showDatePicker} style={styles.dateBtn}>
            <Image
              style={styles.dateBtnImg}
              source={require("../../asset/images/sandclock.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          value={enteredDate}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add" onPress={addGoalHandler} color="#540acc" />
          </View>
          <View style={styles.button}>
            <Button title="cancel" onPress={props.onCancel} color="#f31282" />
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#312b6b",
  },
  inputs: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dateBtn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 50,
    margin: 2,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },
  dateBtnImg: {
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    backgroundColor: "white",
    borderRadius: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    width: "80%",
    color: "#120438",
    borderRadius: 8,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
});
