<template>
  <div v-if="!loading" class="container mx-auto">
    <div v-if="users.length" class="overflow-x-scroll">
      <table
        class="min-w-full divide-y divide-gray-200 border rounded border-gray-300"
      >
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-4 py-3 text-center  font-bold text-black-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              class="px-4 py-3 text-center  font-bold text-black-500 uppercase tracking-wider"
            >
              User Name
            </th>
            <th
              class="px-4 py-3 text-center  font-bold text-black-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              class="px-4 py-3 text-center  font-bold text-black-500 uppercase tracking-wider"
            >
              Address
            </th>
            <th
              class="px-4 py-3 text-center  font-bold text-black-500 uppercase tracking-wider"
            >
              Website
            </th>
            <th
              class="px-4 py-3 text-center  font-bold text-black-500 uppercase tracking-wider"
            >
              Company
            </th>
            <th
              class="px-4 py-3 text-center  font-bold text-black-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(item, index) in paginatedData" :key="index">
            <td class="px-4 py-3 whitespace-nowrap text-center">
              {{ item.name }}
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-center">
              {{ item.username }}
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-center">
              {{ item.email }}
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-center">
              {{ item.address.city }}
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-center">
              {{ item.website }}
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-center">
              {{ item.company.name }}
            </td>
            <td class="px-4 py-3 whitespace-nowrap flex justify-center gap-2">
              <button
                class="px-2 py-1 text-white rounded-2xl bg-green-600"
                @click="editUser(item.id)"
              >
                Edit
              </button>
              <button
                class="px-2 py-1 text-white rounded-2xl bg-red-600"
                @click="openModal(item.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        @click="closeModal"
      >
        <div @click.stop class="bg-white p-6 rounded-lg relative">
          <span
            class="absolute top-2 right-2 text-gray-600 cursor-pointer"
            @click="closeModal"
            >&times;</span
          >
          <p>Are you sure you want to delete this user</p>
          <div class="mt-4 flex justify-start items-center gap-2">
            <button
              @click="deleteUser(currentId)"
              class="bg-blue-500 text-white px-3 py-2 rounded-lg"
            >
              Delete
            </button>
            <button
              @click="closeModal"
              class="text-white bg-gray-300 px-3 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="users.length" class="mt-8 flex justify-center gap-6">
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="px-3 py-1 bg-blue-500 text-white rounded"
      >
        &lt;
      </button>
      <div class="buttons flex justify-center gap-2">
        <button
          class="px-3 py-1 bg-blue-500 text-white rounded"
          v-for="(page, index) in totalPages"
          :key="index"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
      </div>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 bg-blue-500 text-white rounded"
      >
        &gt;
      </button>
    </div>
    <div v-if="!users.length" class="mt-8 flex justify-center font-bold text-lg">There is no data to show...</div>
  </div>
  <div v-if="loading && !error" class="container mt-12 flex justify-center font-bold text-lg">Loading...</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});

const currentId = ref(null);
const showModal = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(8);


const loading = computed(() => store.state.loading)
const error = computed(() => store.state.error)
const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return props.users.slice(startIndex, endIndex);
});

const totalPages = computed(() =>
  Math.ceil(props.users.length / itemsPerPage.value)
);


const openModal = (id) => {
  showModal.value = true;
  currentId.value = id;
};

const closeModal = () => {
  showModal.value = false;
  currentId.value = null;
};

const deleteUser = (id) => {
  closeModal();
  store.dispatch("deleteUser", { id });
};

const editUser = (id) => {
  router.push({ name: "edit_user", params: { id } });
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<style>
table tr:nth-child(odd):not(thead tr) {
  background-color: #eee;
}
</style>
