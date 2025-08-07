<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: "protected",
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
const postAuthor = ref("");
const postTitle = ref("");

const createUser = async (email: string) => {
  await $fetch("/api/user", { method: "POST", body: { email } });
  refresh();
};

const deleteUser = async (id: string) => {
  await $fetch(`/api/user`, { method: "DELETE", query: { id } });
  refresh();
};

const createPost = async (content: string, author: string, title: string) => {
  await $fetch("/api/post", {
    method: "POST",
    body: { content, email: author, title },
  });
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
  <div v-for="user in data" :key="user.id">
    <div>{{ user.email }}</div>
    <UButton
      variant="soft"
      color="error"
      size="sm"
      @click="() => deleteUser(user.id)"
    >
      Delete
    </UButton>
    <USeparator class="my-2" />
  </div>
  <div class="flex gap-2 mt-8">
    <UInput v-model="postTitle" placeholder="Title" />
    <UInput v-model="post" placeholder="Posts" />
    <UInput v-model="postAuthor" placeholder="Author" />

    <UButton @click="() => createPost(post, postAuthor, postTitle)">
      Create Post
    </UButton>
  </div>
  <USeparator class="my-2" />
  <UButton @click="() => refreshPosts()">Refresh</UButton>
  <h3>Posts ({{ posts?.length }})</h3>
  <div v-for="post in posts" :key="post.id">
    <div class="flex flex-col w-full">
      <h3 class="font-bold">{{ post.title }}</h3>
      <p>{{ post.content }}</p>
      <p>Author: {{ post.authorId }}</p>
    </div>
    <UButton
      variant="soft"
      color="error"
      size="sm"
      class="my-2"
      @click="() => deletePost(post.id)"
    >
      Delete
    </UButton>
    <USeparator />
  </div>
</template>
