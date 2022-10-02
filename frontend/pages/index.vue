<template>
  <div>
    <TransactionTable
      :transactions="transactions"
      :asc-order="Boolean(ascOrder)"
      @changeSort="changeSort"
    />
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
      ascOrder: Boolean,
    }
  },
  apollo: {
    transactions: {
      query: getTransactions,
      variables() {
        return { ascOrder: this.ascOrder, take: 20 }
      },
      prefetch: true,
    },
  },
  methods: {
    changeSort() {
      this.ascOrder = !this.ascOrder
    },
  },
}
</script>
