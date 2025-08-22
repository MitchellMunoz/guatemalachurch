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
    <div class="board-wrapper">
        <main class="board">
            <UContainer>
                <p>Redirecting to your dashboard…</p>
            </UContainer>
        </main>
    </div>
</template>
