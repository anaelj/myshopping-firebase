import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";

import { styles } from "./styles";
import { Product, ProductProps } from "../Product";
import firestore from "@react-native-firebase/firestore";
// import { shoppingListExample } from '../../utils/shopping.list.data';

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection("products")
      // .where("quantity", "==", 5) este código para fazer filtros
      //.limit(3) para limitar quantidade de dados de retorno
      .orderBy("description", "asc")
      //.orderBy("quantity")
      // .startAt(3) // condicional
      // .endAt(5) // condicional
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        }) as ProductProps[];
        setProducts(data);
      });
    return () => subscribe();
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
