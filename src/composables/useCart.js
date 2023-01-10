import { ref, onMounted, computed, watch } from "vue";

export default function useCart() {
  const cart = ref([]);
  const cartCount = computed(() => cart.value.length);

  onMounted(() => {
    fetch("http://localhost:3000/cart")
      .then((response) => response.json())
      .then((data) => (cart.value = data.content));
  });

  watch(cart, () => {
    fetch("http://localhost:3000/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: cart.value,
      }),
    });
  });

  const updateCart = (id) => {
    cart.value = cart.value.concat(id);
  };

  return { cartCount, updateCart };
}
