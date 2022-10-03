<template>
  <div class="flex w-full h-screen mx-auto items-center justify-center">
    <div
      v-if="transaction"
      class="overflow-hidden bg-white shadow sm:rounded-lg w-full lg:w-1/2 pt-0 lg:pt-[20px]"
    >
      <div class="px-4 py-5 sm:px-6 bg-black">
        <div class="flex">
          <n-link to="/">
            <client-only>
              <unicon name="arrow-left" fill="white"></unicon>
            </client-only>
          </n-link>
          <h3 class="text-lg font-medium leading-6 text-white align-text-top">
            Transaction Details
          </h3>
        </div>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          {{ transaction.id }}
        </p>
      </div>
      <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Reference</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {{
                transaction.reference
                  ? transaction.reference
                  : 'No Transaction Reference'
              }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Date</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {{ convertDate(transaction.date) }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Account</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {{
                transaction.account
                  ? transaction.account.name
                  : 'No Account Name'
              }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Bank</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {{
                transaction.account
                  ? transaction.account.bank
                  : 'Bank Not Specified'
              }}
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Amount</dt>
            <dd
              class="mt-1 text-xl text-gray-900 sm:col-span-2 sm:mt-0"
              :class="
                transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
              "
            >
              {{ transaction.amount }}
              <span class="text-gray-500">
                {{ transaction.currency }}
              </span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Category</dt>
            <dd
              v-if="transaction.category"
              class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
            >
              <CategoryTag :category="transaction.category" />
              <button
                type="button"
                :class="showCategoryChange ? 'bg-red-600' : 'bg-black'"
                class="mt-2 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-light text-white shadow-sm"
                @click="
                  showCategoryChange
                    ? (showCategoryChange = false)
                    : (showCategoryChange = true)
                "
              >
                {{ showCategoryChange ? 'Cancel' : 'Change Category' }}
              </button>
              <div
                v-if="showCategoryChange"
                class="flex flex-col mt-2 w-max-[300px]"
              >
                <select
                  v-model="selectedCategory"
                  name="category"
                  class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-xs md:text-base"
                  @change="updateCategory"
                >
                  <option :value="undefined">Select New Category</option>
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import getTransactionById from '~/apollo/queries/getTransactionById'
import getAllCategories from '~/apollo/queries/getAllCategories'
import updateTransactionCategory from '~/apollo/mutations/updateTransactionCategory'

import CategoryTag from '~/components/CategoryTag'

export default {
  name: 'TransactionDetails',
  components: {
    CategoryTag,
  },
  data() {
    return {
      transaction: {},
      showCategoryChange: false,
      selectedCategory: undefined,
    }
  },
  methods: {
    convertDate(time) {
      const date = new Date(parseInt(time))
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      return day + '/' + month + '/' + year
    },
    updateCategory() {
      this.$apollo
        .mutate({
          mutation: updateTransactionCategory,
          variables: {
            categoryId: this.selectedCategory,
            transactionId: this.transaction.id,
          },
        })
        .then(() => {
          this.showCategoryChange = false
          this.$apollo.queries.getTransactionById.refetch()
        })
        .finally(() => {
          this.update = false
        })
    },
  },
  apollo: {
    transaction: {
      query: getTransactionById,
      variables() {
        return { id: this.$route.params.id }
      },
      prefetch: true,
    },
    categories: {
      query: getAllCategories,
      prefetch: true,
    },
  },
}
</script>

<style></style>
