export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  await $database.post.delete({
    where: { id: Number(query.id) },
  });
});
