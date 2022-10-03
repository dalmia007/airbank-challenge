<template>
  <div>
    <!-- Transaction Table -->
    <TransactionTable
      class="mt-2"
      :transactions="transactions"
      :asc-order="Boolean(ascOrder)"
      @changeSort="changeSort"
    />

    <!-- Pagination Buttons -->
    <nav class="flex items-center justify-between bg-white py-3 px-6 lg:px-8">
      <div class="flex flex-1 justify-between items-center sm:justify-end">
        <button
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          @click="previousPage"
        >
          Previous
        </button>
        <p class="font-medium mx-auto">{{ currentPage }}</p>
        <button
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
import getTransactions from '~/apollo/queries/getTransactions'
import TransactionTable from '~/components/TransactionTable.vue'

export default {
  name: 'IndexPage',
  components: {
    TransactionTable,
  },
  data() {
    return {
      ascOrder: Boolean || undefined,
      transactionsPerPage: 20,
      currentPage: 0,
    }
  },
  apollo: {
    transactions: {
      query: getTransactions,
      variables() {
        return {
          ascOrder: this.ascOrder,
          take: this.transactionsPerPage,
          skip: this.skipCount,
        }
      },
      prefetch: true,
    },
  },
  computed: {
    skipCount() {
      return this.transactionsPerPage * this.currentPage
    },
  },
  methods: {
    changeSort() {
      this.ascOrder = !this.ascOrder
      this.currentPage = 0
    },
    nextPage() {
      this.currentPage++
    },
    previousPage() {
      if (this.currentPage > 0) {
        this.currentPage--
      }
    },
  },
}
</script>
