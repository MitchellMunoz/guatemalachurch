export default defineEventHandler(async (event) => {
    const _body = await readBody(event);
    // const post = await $database.post.create({
    //   data: {
    //     content: body.content,
    //     title: body.title, // Assuming you have a title in the body

    //   },
    // });

    // TODO We cann't create a post without an author, and now authors are users managed by better-auth
    return null;
    // return post;
});
