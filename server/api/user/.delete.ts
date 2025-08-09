export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    await $database.user.delete({
        where: { id: query.id as string },
    });
});
