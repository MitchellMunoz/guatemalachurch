<script lang="ts" setup>
    const { loggedIn, user, session, clear } = useAuth();
</script>

<template>
    <div>
        <slot v-bind="{ loggedIn, user, session, clear }" />
    </div>
</template>
