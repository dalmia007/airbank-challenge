<template>
  <div
    class="flex justify-center items-center h-max rounded-lg p-3 w-max"
    :style="{
      backgroundColor: bgColor,
    }"
  >
    {{ category.name }}
  </div>
</template>

<script>
export default {
  name: 'CategoryTag',
  props: {
    category: {
      type: Object,
      default: () => ({
        color: String,
        name: String,
      }),
    },
  },

  computed: {
    bgColor() {
      if (!this.category.color) return '#D9DDDC'
      return ('#' + this.category.color).toString()
    },
  },
}
</script>
