<template>
  <form
    @submit.prevent="submitForm"
    class="container mt-8 p-8 mx-auto bg-blue-50 rounded-lg"
  >
    <div class="grid justify-center grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col">
        <div class="flex items-center gap-1">
          <label for="name" class="flex-1">Name:</label>
          <input
            class="rounded-md flex-[4]"
            :class="{ 'border-red-500': v$.name.$error }"
            v-model="formData.name"
            type="text"
            id="name"
            @blur="v$.name.$touch()"
          />
        </div>

        <div v-if="v$.name.$error" class="text-red-500 self-end">
          <span v-if="v$.name.required.$invalid">
            {{ v$.name.required.$message }}
          </span>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center gap-1">
          <label for="user-name" class="flex-1">User Name:</label>
          <input
            class="rounded-md flex-[4]"
            :class="{ 'border-red-500': v$.userName.$error }"
            v-model="formData.userName"
            type="text"
            id="user-name"
            @blur="v$.userName.$touch()"
          />
        </div>

        <div v-if="v$.userName.$error" class="text-red-500 self-end">
          <span v-if="v$.userName.required.$invalid">
            {{ v$.userName.required.$message }}
          </span>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center gap-1">
          <label for="email" class="flex-1">Email:</label>
          <input
            class="rounded-md flex-[4]"
            :class="{ 'border-red-500': v$.email.$error }"
            v-model="formData.email"
            type="text"
            id="email"
            name="email"
            @blur="v$.email.$touch()"
          />
        </div>
        <div v-if="v$.email.$error" class="text-red-500 self-end">
          <span v-if="v$.email.required.$invalid">
            {{ v$.name.required.$message }}
          </span>
          <span v-if="v$.email.email.$invalid">
            {{ v$.email.email.$message }}
          </span>
        </div>
      </div>

      <div class="flex flex-col">
        <div class="flex items-center gap-1">
          <label for="address" class="flex-1">Address:</label>
          <input
            class="rounded-md flex-[4]"
            :class="{ 'border-red-500': v$.address.city.$error }"
            v-model="formData.address.city"
            type="text"
            id="address"
            @blur="v$.address.city.$touch()"
          />
        </div>
        <div v-if="v$.address.city.$error" class="text-red-500 self-end">
          <span v-if="v$.address.city.required.$invalid">
            {{ v$.address.city.required.$message }}
          </span>
        </div>
      </div>

      <div class="flex flex-col">
        <div class="flex items-center gap-1">
          <label for="website" class="flex-1">Website:</label>
          <input
            class="rounded-md flex-[4]"
            :class="{ 'border-red-500': v$.website.$error }"
            v-model="formData.website"
            type="text"
            id="website"
            @blur="v$.website.$touch()"
          />
        </div>
        <div v-if="v$.website.$error" class="text-red-500 self-end">
          <span v-if="v$.website.required.$invalid">
            {{ v$.website.required.$message }}
          </span>
        </div>
      </div>

      <div class="flex flex-col">
        <div class="flex items-center gap-1">
          <label for="company" class="flex-1">Company:</label>
          <input
            class="rounded-md flex-[4]"
            :class="{ 'border-red-500': v$.company.name.$error }"
            v-model="formData.company.name"
            type="text"
            id="company"
            @blur="v$.company.name.$touch()"
          />
        </div>
        <div v-if="v$.company.name.$error" class="text-red-500 self-end">
          <span v-if="v$.company.name.required.$invalid">
            {{ v$.company.name.required.$message }}
          </span>
        </div>
      </div>
    </div>

    <div class="mt-4 flex justify-end items-center">
      <button class="text-white bg-blue-600 rounded-xl px-3 py-2" type="submit">
        Submit
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useStore } from "vuex";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const formData = ref({
  name: "",
  email: "",
  userName: "",
  address: {
    city: "",
  },
  website: "",
  company: {
    name: "",
  },
});
const rules = {
  name: { required },
  email: { required, email },
  userName: { required },
  address: {
    city: { required },
  },
  website: { required },
  company: {
    name: { required },
  },
};
const v$ = useVuelidate(rules, formData);


const error = computed(() => store.state.error);
const usersLength = computed(() => store.getters.usersLength);

watch(error, (newError) => {
  if (newError) notify(newError);
});


const submitForm = async () => {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    store
      .dispatch("addUser", {
        id: usersLength.value + 1,
        ...formData.value,
      })
      .then(() => {
        if (!error.value) {
          success("The user has been added succesfully!");
        }
        setTimeout(() => {
          router.push({ name: "home" });
        }, 2000);
      });
  }
};

const success = (msg) => {
  toast.success(msg, {
    autoClose: 2000,
  });
};

const notify = (msg) => {
  toast.error(msg, {
    autoClose: 2000,
  });
};
</script>
