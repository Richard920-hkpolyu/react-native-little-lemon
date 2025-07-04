import { Link, Stack } from "expo-router";
import "../global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon } from "../components/ui/icon";
import { ShoppingCart, User } from 'lucide-react-native'
import { Pressable } from "react-native";
import { useCart } from "@/store/cartStore";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/store/authStore";

const queryClient = new QueryClient();
export default function RootLayout() {
    const isLoggedIn = useAuth(s => !!s.token);
    const cartItemsNum = useCart((state) => state.items.length);
    return (
        <QueryClientProvider client={queryClient}>
            <GluestackUIProvider>
                {/* render cart icon */}
                <Stack screenOptions={{
                    headerRight: () => (
                        <Link href={'/cart'} asChild>{/*why asChild?*/}
                            <Pressable className="flex-row gap-2">
                                <Icon as={ShoppingCart} />
                                <Text>{cartItemsNum}</Text>
                            </Pressable>
                        </Link>
                    ),

                }}>
                    <Stack.Screen name="index" options={{
                        title: 'Little Lemon Restaurant', headerLeft: () => !isLoggedIn && (
                            <Link href={'/login'} asChild>{/*why asChild?*/}
                                <Pressable className="flex-row gap-2">
                                    <Icon as={User} />
                                </Pressable>
                            </Link>
                        ),
                    }} />
                    <Stack.Screen name="product/[id]" options={{ title: 'Product' }} />
                </Stack>
            </GluestackUIProvider>
        </QueryClientProvider>
    )
}