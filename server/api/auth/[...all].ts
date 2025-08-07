export default defineEventHandler(async (event) => {
  const { client } = $auth();

  return client.handler(toWebRequest(event));
});
