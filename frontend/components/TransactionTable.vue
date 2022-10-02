<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Transactions</h1>
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
                    <a href="#" class="group inline-flex">
                      Date
                      <span
                        class="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                      >
                        <client-only>
                          <unicon name="angle-up"></unicon>
                        </client-only>
                      </span>
                    </a>
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="transaction in transactions" :key="transaction.id">
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
                    TBC
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
export default {
  name: 'TransactionTable',
  props: {
    transactions: { type: Array, default: () => [] },
  },
  methods: {
    convertDate(time) {
      const date = new Date(parseInt(time))
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      return day + '/' + month + '/' + year
    },
  },
}
</script>
