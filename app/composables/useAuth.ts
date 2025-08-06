import { createAuthClient } from "better-auth/client";
import { adminClient, organizationClient } from "better-auth/client/plugins";
import type { RouteLocationRaw } from "vue-router";

type FirstParameter<T extends (...args: any[]) => any> = Parameters<T>[0];

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

  type Session = (typeof client.$Infer.Session)["session"];
  type User = (typeof client.$Infer.Session)["user"];

  const session = useState<Session | null>("auth:session", () => null);
  const user = useState<User | null>("auth:user", () => null);
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

  function createAuthMethod<T extends (...args: any[]) => any>(
    wrapperMethod: T,
    fetchOnSuccess = true
  ) {
    type MethodResult = Awaited<ReturnType<typeof wrapperMethod>>;

    const isLoading = ref(false);
    const data = ref<MethodResult["data"] | null>(null);
    const error = ref<MethodResult["error"] | null>(null);
    const isError = ref(false);
    const isSuccess = computed(() => !!data.value);

    return {
      isLoading,
      data,
      error,
      isError,
      isSuccess,
      mutateAsync: async (options: FirstParameter<T>) => {
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

  const wrappedSignInSocial = async (
    options: FirstParameter<typeof client.signIn.social>
  ) => {
    const { data, error } = await client.signIn.social(options);
    return { data, error };
  };

  const wrappedSignInEmail = async (
    options: FirstParameter<typeof client.signIn.email>
  ) => {
    const { data, error } = await client.signIn.email(options);
    return { data, error };
  };

  const wrappedSignUpEmail = async (
    options: FirstParameter<typeof client.signUp.email>
  ) => {
    const { data, error } = await client.signUp.email(options);
    return { data, error };
  };

  const wrappedForgetPassword = async (
    options: FirstParameter<typeof client.forgetPassword>
  ) => {
    const { data, error } = await client.forgetPassword(options);
    return { data, error };
  };

  const wrappedResetPassword = async (
    options: FirstParameter<typeof client.resetPassword>
  ) => {
    const { data, error } = await client.resetPassword(options);
    return { data, error };
  };

  const clear = async ({
    redirectTo,
  }: { redirectTo?: RouteLocationRaw } = {}) => {
    const res = await client.signOut();
    session.value = null;
    user.value = null;

    if (redirectTo) {
      await navigateTo(redirectTo);
    }

    return res;
  };

  if (import.meta.client) {
    client.$store.listen("$sessionSignal", async (signal) => {
      if (!signal) return;

      await fetch();
    });
  }

  return {
    user,
    loggedIn,
    fetch,
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
