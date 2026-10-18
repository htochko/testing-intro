function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}
const defaultDeliveryCost = 30000;
const minSubtotalForFreeDelivery = 50000;
const availableDiscounts = [{code:'SAVE10', minSubtotal: 20000, discount:10}];

function addToCart(cart, product, quantity) {
  if (quantity === 0) {
    throw new RangeError;
  } 
  const existent = cart.find(({id}) => product.id)
  if (existent) {
    quantity = existent.quantity + quantity;
    cart = removeFromCart(cart, existent.id);
  }
  if (quantity > product.stock) {
    throw new RangeError;
  }
  return [...cart,{ ...product, quantity: quantity}]
}

function changeQuantity(cart, productId, newQuantity) { 
  if (newQuantity === 0) {
    throw new RangeError;
  }
  
  const product = cart.find(({id}) => id === productId );
  if (product) {
    if (newQuantity > product.stock) {
      throw new RangeError;
    }
    cart = removeFromCart(cart, product.id)
    return [...cart,{ ...product, quantity: newQuantity}]
  }
  return cart; 
}
function removeFromCart(cart, productId) {
  return cart.filter(({id}) => id !== productId);
}
function calculateCartSubtotal(cart) { 
  return cart.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, 0)
}
function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart) ;
  const delivery = subtotal > minSubtotalForFreeDelivery ? 0: defaultDeliveryCost;
  discount = availableDiscounts.find((discount) => discount.code==promoCode && subtotal >= discount.minSubtotal)?.discount/100*subtotal || 0;
  return {subtotal, discount, delivery, total: subtotal-discount+delivery}
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
