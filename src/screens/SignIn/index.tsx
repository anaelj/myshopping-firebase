import React, { useState } from "react";

import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

export function SignIn() {
  async function handleSignAnonymously() {
    const { user } = await auth().signInAnonymously();
    console.log(user);
  }

  async function handleCreateUserAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert("Usuário criado com sucesso!"))
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("E-mail indisponível, informe outro!");
        } else if (error.code === "auth/weak-password") {
          Alert.alert("A senha deve ter no mínimo 6 dígitos!");
        }
        console.log("========>", error.code);
      });
  }

  async function handleSigInWithEmailAndPassword() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        console.log(user);
      })
      .catch((error) => {
        if (
          error.code === "auth/wrong-password" ||
          error.code === "auth/user-not-found"
        ) {
          Alert.alert("Usuário ou senha inválido!");
        }
        console.log("--->", error.code);
      });
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleForgotPassword() {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("E-mail de recuperação de senha enviado com sucesso!");
      });
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input placeholder="senha" secureTextEntry onChangeText={setPassword} />

      <Button title="Entrar" onPress={handleSigInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText
          title="Criar minha conta"
          onPress={handleCreateUserAccount}
        />
      </Account>
    </Container>
  );
}
