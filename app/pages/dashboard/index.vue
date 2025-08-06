<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

useHead({
  title: "Dashboard",
});

const { data: posts, refresh: refreshPosts } = await useAsyncData("posts", () =>
  $fetch("/api/post")
);

const { data, refresh } = await useAsyncData("users", () =>
  $fetch("/api/user")
);

const email = ref("");
const post = ref("");

const createUser = async (email: string) => {
  await $fetch("/api/user", { method: "POST", body: { email } });
  refresh();
};

const deleteUser = async (id: number) => {
  await $fetch(`/api/user`, { method: "DELETE", query: { id } });
  refresh();
};

const createPost = async (content: string, author: string, title: string) => {
  await $fetch("/api/post", { method: "POST", body: { content, email: author, title } });
  refreshPosts();
};

const deletePost = async (id: number) => {
  await $fetch(`/api/post`, { method: "DELETE", query: { id } });
  refreshPosts();
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
    <USeparator />
  </div>
    <div class="flex gap-2">
      <UInput v-model="postTitle" placeholder="Title" />
      <UInput v-model="post" placeholder="Posts" />
      <UInput v-model="postAuthor" placeholder="Author" />

      <UButton @click="() => createPost(post, postAuthor, postTitle)"> Create Post </UButton>
    </div>
    <USeparator />
    <UButton @click="() => refreshPosts()">Refresh</UButton>
    <h3>Posts ({{ posts?.length }})</h3>
    <div v-for="post in posts" :key="post.id" class="flex items-center gap-2">
      <div>{{ post.content }}</div>
      <UButton
        variant="soft"
        color="error"
        size="sm"
        @click="() => deletePost(post.id)"
      >
        Delete
      </UButton>
  </div>
</template>
