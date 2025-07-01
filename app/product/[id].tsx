import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {Card} from "../../components/ui/card";
import {Image} from "../../components/ui/image";
import {Text} from "../../components/ui/text";
import {VStack} from "../../components/ui/vstack";
import {Heading} from "../../components/ui/heading";
import {Box} from "../../components/ui/box";
import {Button, ButtonText} from "../../components/ui/button";
import { Stack } from "expo-router";
import { fetchProductById, listProducts } from "../../api/products";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native";
import { useCart } from "@/store/cartStore";

export default function ProductDetailsScreen() {

  const {id} = useLocalSearchParams();

  const addProduct = useCart((state)=>state.addProduct);
  //const cartItems = useCart((state)=>state.items);
  
  const {
    data:product,//rename data to product
    isLoading,
    error,
  }=useQuery({
    queryKey:['products','id'], //the combination make key unique, cache reusable
    queryFn:()=>fetchProductById(Number(id)),
  });


  const addToCart =()=>{
    addProduct(product);
  }

  if(isLoading){
      return <ActivityIndicator/>
    }
    if(error){
      return <Text>Product not found!</Text>
    }

  return (
    <Card className="p-5 rounded-lg max-w-[360px] mx-auto flex-1">
      {/* rename the title after routing to product details */}
      <Stack.Screen options={{title: product.name}}/>
      {/* Product Image */}
      <Image
        source={{ uri: product.image }}
        className="mb-6 h-[240px] w-full rounded-md"
        alt={`${product.name} image`}
        resizeMode="contain"
      />

      {/* Product Info */}
      <Text className="text-sm font-normal mb-2 text-typography-700">
        {product.name}
      </Text>

      <VStack className="mb-6">
        <Heading size="md" className="mb-4">
          ${product.price}
        </Heading>
        <Text size="sm">
          {product.description}
        </Text>
      </VStack>

      {/* Action Buttons */}
      <Box className="flex-col sm:flex-row">
        <Button onPress={addToCart} className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
          <ButtonText size="sm">Add to cart</ButtonText>
        </Button>
        <Button
          variant="outline"
          className="px-4 py-2 border-outline-300 sm:flex-1"
        >
          <ButtonText size="sm" className="text-typography-600">
            Wishlist
          </ButtonText>
        </Button>
      </Box>
    </Card>
  );
}