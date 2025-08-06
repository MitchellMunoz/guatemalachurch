<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

useHead({
  title: "Dashboard",
});

const { data, refresh } = await useAsyncData("users", () =>
  $fetch("/api/user")
);

const email = ref("");

const createUser = async (email: string) => {
  await $fetch("/api/user", { method: "POST", body: { email } });
  refresh();
};

const deleteUser = async (id: number) => {
  await $fetch(`/api/user`, { method: "DELETE", query: { id } });
  refresh();
};
</script>

<template>
  <div>Sample User management to demonstrate Prisma</div>
  <USeparator />
  <div class="flex gap-2">
    <UInput v-model="email" placeholder="Email" />
    <UButton @click="() => createUser(email)"> Create User </UButton>
  </div>
  <USeparator />
  <UButton @click="() => refresh()">Refresh</UButton>
  <h3>Users ({{ data?.length }})</h3>
  <div v-for="user in data" :key="user.id" class="flex items-center gap-2">
    <div>{{ user.email }}</div>
    <UButton
      variant="soft"
      color="error"
      size="sm"
      @click="() => deleteUser(user.id)"
    >
      Delete
    </UButton>
  </div>
</template>
