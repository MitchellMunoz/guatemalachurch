export default defineNuxtRouteMiddleware((to) => {
    const { user } = useAuth();

    enum ROLES {
        SUPERUSER = 'SUPERUSER',
        ADMIN = 'ADMIN',
        COORDINATOR = 'COORDINATOR',
        PARTICIPANT = 'PARTICIPANT',
    }

    enum RESTRICTED_ROOT_PATHS {
        SUPERUSER = '/dashboard/superuser',
        ADMIN = '/dashboard/admin',
        COORDINATOR = '/dashboard/coordinator',
        PARTICIPANT = '/dashboard/participant',
    }

    const role = user.value?.role as ROLES.SUPERUSER | ROLES.ADMIN | ROLES.COORDINATOR | ROLES.PARTICIPANT | undefined;

    if (!role) return;

    if (to.path.startsWith('/dashboard/')) {
        if (to.path.startsWith(`/dashboard/${role.toLowerCase()}`)) return;

        const allowedPaths = Object.values(RESTRICTED_ROOT_PATHS);
        if (!allowedPaths.some((path) => to.path.startsWith(path))) return;
        return navigateTo(`/dashboard/${role.toLowerCase()}`);
    }
});
