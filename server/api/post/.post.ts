export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const post = await $database.post.create({
    data: {
      content: body.content,
      title: body.title, // Assuming you have a title in the body
      author: {
        create: {
          email: body.email, // Assuming you have an email in the body
        },
      }
    },
  });

  return post;
});
