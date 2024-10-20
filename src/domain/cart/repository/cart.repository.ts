export default interface CartRepository {
  createCart(userId): Promise<void>;

  getCartById(userId: string): Promise<any>;

  getCartProducts(userId: string): Promise<any>;

  addProductToCart(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<any>;

  removeProductFromCart(userId: string, productId: string): Promise<void>;

  updateProductCart(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<void>;

  getProductFromCart(userId: string, productId: string): Promise<any>;
}
