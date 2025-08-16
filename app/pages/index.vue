<script setup lang="ts">
    useSeoMeta({
        title: 'Guatemala Church',
        description: 'Serving communities through missions, projects, and compassion.',
    });
    definePageMeta({
        layout: 'brochure',
        splash: {
            contentWidth: 'xl',
            src: '/images/church.jpeg',
            alt: 'Sunrise over desert ridge',
            eyebrow: 'Guatemala Church',
            title: 'Serving With Love. Changing Lives.',
            subtitle: 'Join us as we build projects, lead trips, and support communities across Guatemala.',
            align: 'center',
            height: 'hero',
            overlay: true,
            overlayOpacity: 0.45,
            bottomFade: true,
            // Prefer links here (the layout will call `navigateTo`)
            actions: [
                { label: 'Get Involved', to: '/auth/sign-up' },
                { label: 'Learn More', to: '/projects' },
            ],
        },
    });

    const features = [
        {
            icon: 'i-heroicons-heart',
            title: 'Community Impact',
            desc: 'Support projects that empower the local church to meet needs across Guatemala.',
        },
        {
            icon: 'i-heroicons-globe-alt',
            title: 'Mission Trips',
            desc: 'Join upcoming trips and serve alongside our team.',
        },
        {
            icon: 'i-heroicons-hand-raised',
            title: 'Get Involved',
            desc: 'Donate, volunteer, or partner with us to make a difference.',
        },
    ];
</script>

<template>
    <div>
        <section class="py-16 sm:py-24">
            <div class="text-center">
                <UBadge size="sm" variant="soft" class="mb-3">Guatemala Church</UBadge>
                <h1 class="text-3xl font-bold tracking-tight sm:text-5xl">Serving With Love. Changing Lives.</h1>
                <p class="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
                    Join us as we build projects, lead trips, and support communities across Guatemala.
                </p>
                <div class="mt-8 flex justify-center gap-3">
                    <UButton to="/auth/sign-up" color="primary" size="lg">Get Involved</UButton>
                    <UButton to="/projects" size="lg" variant="ghost" icon="i-heroicons-arrow-right-circle"
                        >Learn More</UButton
                    >
                </div>
            </div>
        </section>

        <section class="py-12">
            <div class="grid gap-6 sm:grid-cols-3">
                <UCard v-for="f in features" :key="f.title" class="h-full">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <UIcon :name="f.icon" class="text-primary-500 h-5 w-5" />
                            <span class="font-semibold">{{ f.title }}</span>
                        </div>
                    </template>
                    <p class="text-gray-600 dark:text-gray-300">{{ f.desc }}</p>
                </UCard>
            </div>
        </section>

        <section class="py-12">
            <UCard>
                <div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <div>
                        <h3 class="text-xl font-semibold">Join our next trip</h3>
                        <p class="text-gray-600 dark:text-gray-300">
                            Register to serve in our upcoming missions and projects.
                        </p>
                    </div>
                    <div class="flex gap-3">
                        <UButton to="/projects" color="primary">See Projects</UButton>
                        <UButton to="/auth/sign-up" variant="soft">Create Account</UButton>
                    </div>
                </div>
            </UCard>
        </section>
    </div>
</template>
