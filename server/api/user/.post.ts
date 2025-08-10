export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const post = await $database.user.create({
        data: body,
    });

    return post;
});
