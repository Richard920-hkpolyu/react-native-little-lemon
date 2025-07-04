import { useAuth } from '@/store/authStore';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function createOrder(items: any[]) {
  try {
    const token = useAuth.getState().token;

    if (!token) {
      throw new Error('No authentication token available');
    }

    if (!items || items.length === 0) {
      throw new Error('Order items cannot be empty');
    }

    console.log('Creating order with items:', JSON.stringify(items, null, 2));

    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ order: {}, items }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Order creation failed:', {
        status: res.status,
        statusText: res.statusText,
        url: `${API_URL}/orders`,
        requestBody: { items },
        response: data
      });
      throw new Error(data.message || `Order creation failed with status ${res.status}`);
    }

    console.log('Order created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in createOrder:', error);
    throw error; // Re-throw to let the caller handle it
  }
}