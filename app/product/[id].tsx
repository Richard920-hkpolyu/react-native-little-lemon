import { useLocalSearchParams } from "expo-router";
import products from "../../assets/products.json"
import React from "react";
import {Card} from "../../components/ui/card";
import {Image} from "../../components/ui/image";
import {Text} from "../../components/ui/text";
import {VStack} from "../../components/ui/vstack";
import {Heading} from "../../components/ui/heading";
import {Box} from "../../components/ui/box";
import {Button, ButtonText} from "../../components/ui/button";

export default function ProductDetailsScreen() {
    const {id} = useLocalSearchParams();
    const product = products.find(product => product.id ===Number(id));
    if(!product){
        return <Text>Product Not Found</Text>
    }

    return (
        <Card className="p-5 rounded-lg flex-1">
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
                <Text size="sm" numberOfLines={2}>
                  {product.description}
                </Text>
              </VStack>
        
              {/* Action Buttons */}
              <Box className="flex-col sm:flex-row">
                <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
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
    )
}