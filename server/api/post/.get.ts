export default defineEventHandler(async () => {
  const posts = await $database.post.findMany();

  return posts;
});
