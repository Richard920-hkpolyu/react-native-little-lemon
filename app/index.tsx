import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
//import products from "../assets/products.json";
import ProductListItem from "../components/ProductListItem";

import {useBreakpointValue} from "../components/ui/utils/use-break-point-value";
import { listProducts } from "../api/products";
const HomeScreen = () => {

  const [products, setProducts] = useState();

    const numColumns = useBreakpointValue({
        default:2,
        sm:3,
    });

    useEffect(() =>{
      const fetchProducts = async ()=>{
        const data = await listProducts();
        setProducts(data);
      }
        fetchProducts();
    },[]);


  return (
    <FlatList
        key={Number(numColumns)}
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={Number(numColumns)}
      contentContainerStyle={{ gap: 8 }}
      columnWrapperStyle={{ gap: 8 }}
      renderItem={({ item }) => <ProductListItem product={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeScreen;