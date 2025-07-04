import { HStack } from '../components/ui/hstack';
import { VStack } from '../components/ui/vstack';
import { Text } from '../components/ui/text';
import { useCart } from '@/store/cartStore';
import { FlatList } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Redirect } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/api/orders';


export default function CartScreen() {
    const items = useCart((state) => state.items);
    const resetCart = useCart((state) => state.resetCart);

    const createOrderMutation = useMutation({
    mutationFn: () =>
      createOrder(
        items.map((item) => ({
          productId: item.product.id,//item.product refer to specific product detail
          quantity: item.quantity,//////////default 1
          price: item.product.price, // MANAGE FORM SERVER SIDE
        }))
      ),
    onSuccess: (data) => {
      console.log(data);
      //paymentIntentMutation.mutate({ orderId: data.id });
      resetCart();
    },
    onError: (error) => {
      console.log(error);
    },
  });

    const onCheckout = async () => {
        createOrderMutation.mutate();
        //send order to server
        // openPaymentSheet();
        
    };
    if (items.length === 0) {
        return <Redirect href={'/'} />;
    }
    return (
        <FlatList
            data={items}
            contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto p-2"
            renderItem={({ item }) => (
                <HStack className="bg-white p-3">
                    <VStack space="sm">
                        <Text bold>{item.product.name}</Text>
                        <Text>$ {item.product.price}</Text>
                    </VStack>
                    <Text className="ml-auto">{item.quantity}</Text>
                </HStack>
            )}
            ListFooterComponent={() => (
                <Button onPress={onCheckout}>
                    <ButtonText>Checkout</ButtonText>
                </Button>
            )}
        />
    );
}
