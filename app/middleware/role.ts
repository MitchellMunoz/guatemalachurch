export default defineNuxtRouteMiddleware((to) => {
    const { user } = useAuth();

    const role = user.value?.role as 'SUPERUSER' | 'ADMIN' | 'COORDINATOR' | 'PARTICIPANT' | undefined;

    if (!role) return;

    // prevent users from accessing dashboards not matching their role
    if (to.path.startsWith('/dashboard/')) {
        if (to.path.startsWith(`/dashboard/${role.toLowerCase()}`)) return;

        return navigateTo(`/dashboard/${role.toLowerCase()}`);
    }
});
