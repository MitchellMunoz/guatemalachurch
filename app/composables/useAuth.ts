import { createAuthClient } from 'better-auth/client';
import { adminClient, organizationClient } from 'better-auth/client/plugins';
import type { RouteLocationRaw } from 'vue-router';

// Removed unused FirstParameter helper after refactor

export const useAuth = () => {
    const url = useRequestURL();
    const headers = useRequestHeaders();

    const client = createAuthClient({
        baseURL: url.origin,
        fetchOptions: {
            headers,
        },
        plugins: [adminClient(), organizationClient()],
    });

    type Session = (typeof client.$Infer.Session)['session'];
    type User = (typeof client.$Infer.Session)['user'];

    const session = useState<Session | null>('auth:session', () => null);
    const user = useState<User | null>('auth:user', () => null);
    const loggedIn = computed(() => !!session.value);

    const fetch = async () => {
        const { data: sessionData } = await client.getSession({
            fetchOptions: {
                headers,
            },
        });

        if (!sessionData) return null;

        session.value = sessionData.session || null;
        user.value = sessionData.user || null;

        return sessionData;
    };

    function createAuthMethod<TParam, TResult extends { data: unknown; error: unknown }>(
        wrapperMethod: (options: TParam) => Promise<TResult>,
        fetchOnSuccess = true,
    ) {
        type MethodResult = Awaited<ReturnType<typeof wrapperMethod>>;

        const isLoading = ref(false);
        const data = ref<MethodResult['data'] | null>(null);
        const error = ref<MethodResult['error'] | null>(null);
        const isError = ref(false);
        const isSuccess = computed(() => !!data.value);

        return {
            isLoading,
            data,
            error,
            isError,
            isSuccess,
            mutateAsync: async (options: TParam) => {
                isLoading.value = true;

                const { data: _data, error: _error } = await wrapperMethod(options);

                isLoading.value = false;

                if (_error) {
                    isError.value = true;
                    error.value = _error;
                } else {
                    data.value = _data;
                    if (fetchOnSuccess) {
                        await fetch();
                    }

                    return true;
                }

                return false;
            },
        };
    }

    const wrappedSignInSocial = (options: Parameters<typeof client.signIn.social>[0]) => client.signIn.social(options);

    const wrappedSignInEmail = (options: Parameters<typeof client.signIn.email>[0]) => client.signIn.email(options);

    const wrappedSignUpEmail = (options: Parameters<typeof client.signUp.email>[0]) => client.signUp.email(options);

    const wrappedForgetPassword = (options: Parameters<typeof client.forgetPassword>[0]) =>
        client.forgetPassword(options);

    const wrappedResetPassword = (options: Parameters<typeof client.resetPassword>[0]) => client.resetPassword(options);

    const clear = async ({ redirectTo }: { redirectTo?: RouteLocationRaw } = {}) => {
        const res = await client.signOut();
        session.value = null;
        user.value = null;

        if (redirectTo) {
            await navigateTo(redirectTo);
        }

        return res;
    };

    if (import.meta.client) {
        client.$store.listen('$sessionSignal', async (signal) => {
            if (!signal) return;

            await fetch();
        });
    }

    return {
        user,
        loggedIn,
        fetch,
        session,
        signIn: {
            withSocial: () => createAuthMethod(wrappedSignInSocial),
            withEmail: () => createAuthMethod(wrappedSignInEmail),
        },
        signUp: {
            withEmail: () => createAuthMethod(wrappedSignUpEmail, false),
        },
        forgetPassword: () => createAuthMethod(wrappedForgetPassword, false),
        resetPassword: () => createAuthMethod(wrappedResetPassword, false),
        clear,
    };
};
