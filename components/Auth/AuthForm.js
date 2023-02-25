import { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Offsets } from "../../styles/Offsets";
import { IconTypes } from "../../util/Constants";

import Button from "../ui/Button";
import Input from "./Input";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.container}>

      <Image style={styles.logo} source={require('../../assets/polecat_logo.png')}></Image>
      
      <Input
        label="Email Address"
        onUpdateValue={updateInputValueHandler.bind(this, "email")}
        secure={false}
        value={enteredEmail}
        keyboardType="email-address"
        isInvalid={emailIsInvalid}
        iconType={IconTypes.email}
      />
      {!isLogin && (
        <Input
          label="Confirm Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, "confirmEmail")}
          secure={false}
          value={enteredConfirmEmail}
          keyboardType="email-address"
          isInvalid={emailsDontMatch}
        iconType={IconTypes.email}
        />
      )}
      <Input
        label="Password"
        onUpdateValue={updateInputValueHandler.bind(this, "password")}
        secure
        keyboardType="text"
        value={enteredPassword}
        isInvalid={passwordIsInvalid}
        iconType={IconTypes.password}
      />
      {!isLogin && (
        <Input
          label="Confirm Password"
          onUpdateValue={updateInputValueHandler.bind(this, "confirmPassword")}
          secure
          keyboardType="text"
          value={enteredConfirmPassword}
          isInvalid={passwordsDontMatch}
        iconType={IconTypes.password}
        />
      )}
      <View style={styles.buttons}>
        <Button onPress={submitHandler}>
          {isLogin ? "Log In" : "Sign Up"}
        </Button>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttons: {
    marginTop: 12,
    width: "100%",
    borderRadius: Offsets.BorderRadius
  },
  logo: {
    width: "40%",
    height: undefined,
    aspectRatio: 1,
    marginBottom: Offsets.LargeMargin
  }
});
