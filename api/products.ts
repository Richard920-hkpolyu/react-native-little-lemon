const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function listProducts() {
  const res = await fetch(`${API_URL}/products`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Error');
  }
  return data;
}

export async function fetchProductById(id: number) {
  const res = await fetch(`${API_URL}/products/${id}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Error');
  }
  return data;
}

export async function fetchProductByCategory(category: string) {
  const res = await fetch(`${API_URL}/products/category/${category}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Error');
  }
  return data;
}