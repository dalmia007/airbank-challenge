<template>
  <div>
    <li v-for="category in categories" :key="category.id">
      {{ category.name }}
    </li>
  </div>
</template>

<script>
import getAllCategories from '~/apollo/queries/getAllCategories'

export default {
  name: 'IndexPage',
  apollo: {
    categories: {
      query: getAllCategories,
      prefetch: true,
    },
  },
}
</script>
