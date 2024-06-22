<script setup>
import { computed } from 'vue';

const props = defineProps({
  image: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: null,
  },
  shadow: {
    type: String,
    default: null,
  },
  borderRadius: {
    type: String,
    default: null,
  },
  circular: {
    type: Boolean,
    default: false,
  },
});

const defaultImage = "https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=500w";

const imageUrl = computed(() => {
  return props.image ? props.image : defaultImage;
});

const getSize = (size) => (size ? `avatar-${size}` : null);
const getClasses = (shadow, circular, borderRadius) => {
  let shadowValue, circularValue, borderRadiusValue;

  if (shadow) {
    shadowValue = shadow === "regular" ? "shadow" : `shadow-${shadow}`;
  } else {
    shadowValue = null;
  }

  circularValue = circular ? "rounded-circle" : null;

  borderRadiusValue = borderRadius ? `border-radius-${borderRadius}` : null;

  return `${shadowValue} ${circularValue} ${borderRadiusValue}`;
};
</script>
<template>
  <div class="avatar" :class="getSize(size)">
    <img
      :src="imageUrl"
      :alt="alt"
      :class="[getClasses(shadow, circular, borderRadius)]"
    />
  </div>
</template>

<style scoped>
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
