<script setup lang="ts">
    definePageMeta({
        middleware: ['protected'],
    });

    const { user, fetch } = useAuth();

    if (!user.value) {
        await fetch();
    }

    const role = user.value?.role?.toLowerCase?.() || 'participant';
    await navigateTo(`/dashboard/${role}`);
</script>

<template>
    <div class="h-full overflow-auto p-4">
        <main class="flex flex-row items-start">
            <UContainer>
                <p>Redirecting to your dashboard…</p>
            </UContainer>
        </main>
    </div>
</template>
