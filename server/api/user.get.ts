export default defineEventHandler(async () => {
  const users = await $database.user.findMany();

  return users;
});
