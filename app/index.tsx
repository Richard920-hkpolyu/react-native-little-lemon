import React from "react";
import { ActivityIndicator, FlatList } from "react-native";
import ProductListItem from "../components/ProductListItem";
import {Text} from "../components/ui/text";
import {useBreakpointValue} from "../components/ui/utils/use-break-point-value";
import { listProducts } from "../api/products";
import { useQuery } from "@tanstack/react-query";
const HomeScreen = () => {
  const {data,isLoading,error} = useQuery({
    queryKey:['products'],
    queryFn:listProducts,
  })

  const numColumns = useBreakpointValue({
        default:2,
        sm:3,
  });

  if(isLoading){
    return <ActivityIndicator/>
  }
  if(error){
    return <Text>Error fetching products</Text>
  }

  return (
    <FlatList
      key={Number(numColumns)}
      data={data}
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




  // const [products, setProducts] = useState();
  // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //       try {
    //         const data = await listProducts();
    //         setProducts(data);
    //       } catch (error) {
    //         console.error("Error fetching products:", error);
    //       } finally {
    //         setLoading(false);
    //       }
    //     };
    //     fetchProducts();
    //   }, []);