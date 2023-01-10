<script setup>
import { ref, computed } from "vue";
import ReviewForm from "@/components/ReviewForm.vue";
import ReviewList from "./ReviewList.vue";
import greenSocks from "@/assets/images/socks_green.jpeg";
import blueSocks from "@/assets/images/socks_blue.jpeg";

const props = defineProps({
  premium: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["add-to-cart"]);

const product = ref("Socks");
const brand = ref("Vue Mastery");

const selectedVariant = ref(0);

const details = ref(["50% cotton", "30% wool", "20% polyester"]);

const variants = ref([
  { id: 2234, color: "green", image: greenSocks, quantity: 50 },
  { id: 2235, color: "blue", image: blueSocks, quantity: 0 },
]);

const reviews = ref([]);

const title = computed(() => {
  return brand.value + " " + product.value;
});

const image = computed(() => {
  return variants.value[selectedVariant.value].image;
});

const inStock = computed(() => {
  return !!variants.value[selectedVariant.value].quantity;
});

const shipping = computed(() => {
  if (props.premium) {
    return "Free";
  } else {
    return 2.99;
  }
});

const addToCart = () => {
  emit("add-to-cart", variants.value[selectedVariant.value].id);
};

const updateVariant = (index) => {
  selectedVariant.value = index;
};

const addReview = (review) => {
  reviews.value.push(review);
};
</script>

<template>
  <div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img v-bind:src="image" />
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>
        <ul>
          <li v-for="detail in details" :key="detail">{{ detail }}</li>
        </ul>
        <div
          v-for="(variant, index) in variants"
          :key="variant.id"
          @mouseover="updateVariant(index)"
          class="color-circle"
          :style="{ backgroundColor: variant.color }"
        ></div>
        <button
          class="button"
          v-on:click="addToCart"
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }"
        >
          Add to cart
        </button>
      </div>
      <ReviewList>
        <ul>
          <li v-for="(review, index) in reviews" :key="index">
            <span>{{ review.name }} gave this {{ review.rating }} stars</span>
            <br />
            <span>{{ review.content }}</span>
          </li>
        </ul>
      </ReviewList>
      <ReviewForm @review-submitted="addReview"></ReviewForm>
    </div>
  </div>
</template>
