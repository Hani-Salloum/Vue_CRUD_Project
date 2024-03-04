<template>
  <div class="mt-12">
    <MyTable :users="users"/>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import MyTable from "../components/MyTable.vue";
import { useStore } from "vuex";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const store = useStore();

onMounted(() => {
  fetchUsers();
});

const users = computed(() => store.state.users);
const error = computed(() => store.state.error);


watch(error, (newError) => {
  if (newError) notify(newError);
});


const fetchUsers = () => {
  store.dispatch("fetchUsers");
};

const notify = (msg) => {
  toast.error(msg, {
    autoClose: 2000,
  });
};
</script>

<style></style>
