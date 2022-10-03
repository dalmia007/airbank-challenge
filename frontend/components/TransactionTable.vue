<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl text-center font-semibold text-gray-900">
          Transactions
        </h1>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div
            class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Reference
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                  >
                    <div class="group inline-flex items-center">
                      Date
                      <span
                        class="ml-1 mt-2 cursor-pointer"
                        @click="$emit('changeSort')"
                      >
                        <client-only>
                          <unicon
                            :name="ascOrder ? 'angle-up' : 'angle-down'"
                          ></unicon>
                        </client-only>
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-300 bg-white">
                <tr
                  v-for="transaction in transactions"
                  :key="transaction.id"
                  role="button"
                  @click="routeToDetails(transaction.id)"
                >
                  <td
                    v-if="transaction.reference"
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    {{ transaction.reference }}
                  </td>

                  <td
                    v-else
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-light text-gray-400 sm:pl-6"
                  >
                    No Reference Provided
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <CategoryTag
                      v-if="transaction.category"
                      :category="transaction.category"
                    />
                    <p v-else class="text-gray-300">No Category Assigned</p>
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"
                  >
                    {{ convertDate(transaction.date) }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-right">
                    {{ transaction.amount }}
                    <span class="text-gray-300 text-right">{{
                      transaction.currency
                    }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryTag from '~/components/CategoryTag'

export default {
  name: 'TransactionTable',
  components: {
    CategoryTag,
  },
  props: {
    transactions: { type: Array, default: () => [] },
    ascOrder: Boolean,
  },
  emits: ['changeSort'],
  methods: {
    convertDate(time) {
      const date = new Date(parseInt(time))
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      return day + '/' + month + '/' + year
    },
    routeToDetails(id) {
      this.$router.push(`transactions/${id}`)
    },
  },
}
</script>
