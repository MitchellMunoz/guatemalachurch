export default defineNuxtRouteMiddleware(async (to) => {
    if (!to.path.startsWith('/dashboard')) return;

    const { loggedIn, session, user, fetch } = useAuth();

    if (!session.value || !user.value) {
        await fetch();
    }

    if (!loggedIn.value) return navigateTo('/auth/sign-in');
});
