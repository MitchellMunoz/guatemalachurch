export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  await $database.user.delete({
    where: { id: Number(query.id) },
  });
});
