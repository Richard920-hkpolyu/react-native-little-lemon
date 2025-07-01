import React from "react";
import { FlatList } from "react-native";
import products from "../assets/products.json";
import ProductListItem from "../components/ProductListItem";

const HomeScreen = () => {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={{ gap: 8 }}
      columnWrapperStyle={{ gap: 8 }}
      renderItem={({ item }) => <ProductListItem product={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeScreen;