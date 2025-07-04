import React, { useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import ProductListItem from "../components/ProductListItem";
import { Text } from "../components/ui/text";
import { useBreakpointValue } from "../components/ui/utils/use-break-point-value";
import { fetchProductByCategory, listProducts } from "../api/products";
import { useQuery } from "@tanstack/react-query";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { View } from "@/components/ui/view";
import { ScrollView } from "@/components/ui/scroll-view";

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const buttons = [
    { id: 1, type: "all" },
    { id: 2, type: "main" },
    { id: 3, type: "a la carte" },
    { id: 4, type: "dessert" },
    { id: 5, type: "drink" },
  ];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => selectedCategory === "All"
      ? listProducts()
      : fetchProductByCategory(selectedCategory),
  });

  const handleCategoryChange = (type: string) => {
    setSelectedCategory(type);
    refetch(); // Explicitly refetch when category changes
  };

  const numColumns = useBreakpointValue({ default: 2, sm: 3 });

  if (isLoading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error fetching products</Text>;

  return (

    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxWidth: '100%' }}>
        <HStack space="md">
          {buttons.map((item) => (
            <Button
              key={item.id}
              size="md"
              variant="outline"
              onPress={() => handleCategoryChange(item.type)}
              style={{
                backgroundColor: selectedCategory === item.type ? "#495E57" : "#FFFFFF",
              }}
            >
              <ButtonText style={{
                color: selectedCategory === item.type ? "#EDEFEE" : "#333333",
              }}>{item.type}</ButtonText>
            </Button>
          ))}
        </HStack>
      </ScrollView>


      <FlatList
        key={numColumns}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={{ gap: 8, paddingBottom: 16 }}
        columnWrapperStyle={{ gap: 8 }}
        renderItem={({ item }) => <ProductListItem product={item} />}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
};

export default HomeScreen;