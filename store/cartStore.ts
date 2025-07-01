import { create } from 'zustand';

export const useCart = create((set) => ({
  items: [],

  //add action
  addProduct: (product: any) =>
    // TODO: if already is cart, increase quantity, else, add a new item
  //not finish
    set((state) => ({
      items: [...state.items, { product, quantity: 1 }],
    })),

    //react action
  resetCart: () => set({ items: []})
}));
