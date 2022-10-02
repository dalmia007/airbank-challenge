<template>
  <div>
    <TransactionTable :transactions="transactions" />
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
  apollo: {
    transactions: {
      query: getTransactions,
      variables() {
        return { ascOrder: true }
      },
      prefetch: true,
    },
  },
}
</script>
