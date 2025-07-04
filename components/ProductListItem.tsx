import React from "react";
import { Card } from "../components/ui/card";
import { Image } from "../components/ui/image";
import { Text } from "../components/ui/text";
import { VStack } from "../components/ui/vstack";
import { Heading } from "../components/ui/heading";
import { Box } from "../components/ui/box";
import { Button, ButtonText } from "../components/ui/button";
import { Link } from "expo-router";
import { HStack } from "./ui/hstack";


const ProductListItem = ({ product }) => {
  const { id, name, description, image, price } = product;

  return (
    <Card className="rounded-lg max-w-[360px] mx-auto flex-1">
      <Link href={`product/${id}`}>
        <Image
          source={{ uri: image }}
          className="h-[150px] w-full rounded-md flex-1"
          alt={`${name} image`}
          resizeMode="contain"
        />
        <Text className="text-lg font-normal mb-2 text-typography-700">
          {product.name}
        </Text>
      </Link>
      <Heading size="md" className="mb-4">
        ${price}
      </Heading>
    </Card>
  );
};

export default ProductListItem;