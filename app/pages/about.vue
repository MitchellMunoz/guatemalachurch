<script setup lang="ts">
    useSeoMeta({
        title: 'About – Guatemala Church',
        description:
            'Our singular focus is to plant healthy, multiplying churches. Churches change communities through discipleship, compassion, and tangible care — feeding the malnourished, providing clean water, and empowering families.',
    });

    const pillars = [
        {
            icon: 'i-heroicons-building-library',
            title: 'Church Planting',
            desc: 'We plant healthy, self-replicating churches pastored by local leaders who know and love their communities.',
        },
        {
            icon: 'i-heroicons-user-group',
            title: 'Discipleship',
            desc: 'We equip believers to grow as followers of Jesus and to serve their neighbors with compassion and integrity.',
        },
        {
            icon: 'i-heroicons-home-modern',
            title: 'Community Transformation',
            desc: 'Churches become hubs of hope that address practical needs — from food to water to education.',
        },
    ];

    const programs = [
        {
            icon: 'i-heroicons-heart',
            title: 'Feed the Malnourished',
            desc: 'Targeted nutrition and regular meals for vulnerable children and families in need.',
        },
        {
            icon: 'i-heroicons-droplet',
            title: 'Clean Water',
            desc: 'Wells, filters, and hygiene training so every family has access to safe drinking water.',
        },
        {
            icon: 'i-heroicons-academic-cap',
            title: 'Education Support',
            desc: 'Tutoring, school supplies, and scholarships that open doors and break cycles of poverty.',
        },
    ];

    const stats = [
        { label: 'Churches Planted', value: '1' },
        { label: 'New Church In Progress', value: '1' },
        { label: 'Families Served / year', value: '1,500+' },
    ];
</script>

<template>
    <div>
        <section class="py-12 sm:py-16">
            <div class="mx-auto max-w-3xl text-center">
                <UBadge size="sm" variant="soft" class="mb-3">About Us</UBadge>
                <h1 class="text-3xl font-bold tracking-tight sm:text-5xl">A Singular Focus: We Plant Churches</h1>
                <p class="mt-4 text-gray-600 dark:text-gray-300">
                    We believe healthy churches change communities. Through gospel-centered discipleship and practical
                    compassion, we serve the whole person — feeding the malnourished, providing clean water, and
                    empowering families to thrive.
                </p>
            </div>
        </section>

        <section class="py-8">
            <div class="grid gap-6 sm:grid-cols-3">
                <UCard v-for="p in pillars" :key="p.title" class="h-full">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <UIcon :name="p.icon" class="text-primary-500 h-5 w-5" />
                            <span class="font-semibold">{{ p.title }}</span>
                        </div>
                    </template>
                    <p class="text-gray-600 dark:text-gray-300">{{ p.desc }}</p>
                </UCard>
            </div>
        </section>

        <section class="py-8">
            <UCard>
                <div class="grid gap-6 sm:grid-cols-3">
                    <div v-for="s in stats" :key="s.label" class="text-center">
                        <div class="text-primary-600 dark:text-primary-400 text-3xl font-bold">{{ s.value }}</div>
                        <div class="text-gray-600 dark:text-gray-300">{{ s.label }}</div>
                    </div>
                </div>
            </UCard>
        </section>

        <section class="py-8">
            <div class="grid gap-6 sm:grid-cols-3">
                <UCard v-for="pr in programs" :key="pr.title">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <UIcon :name="pr.icon" class="text-primary-500 h-5 w-5" />
                            <span class="font-semibold">{{ pr.title }}</span>
                        </div>
                    </template>
                    <p class="text-gray-600 dark:text-gray-300">{{ pr.desc }}</p>
                </UCard>
            </div>
        </section>

        <section class="py-8">
            <UCard>
                <div class="space-y-4">
                    <h3 class="text-xl font-semibold">Affiliations & Further Reading</h3>
                    <div class="grid gap-6 sm:grid-cols-2">
                        <div>
                            <div class="mb-2 font-medium">Affiliation</div>
                            <ULink to="https://www.acts29.com" target="_blank" rel="noopener" class="text-primary-500">
                                Acts 29 – A global church‑planting network
                            </ULink>
                        </div>
                        <div>
                            <div class="mb-2 font-medium">Our Story</div>
                            <ul class="list-disc space-y-2 pl-5">
                                <li>
                                    <ULink to="https://christ-church.com/los-chilitos" target="_blank" rel="noopener">
                                        Christ Church: Cristo El Redentor, Los Chilitos
                                    </ULink>
                                </li>
                                <li>
                                    <ULink
                                        to="https://www.thegospelcoalition.org/article/accidentally-planted-church/"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        The Gospel Coalition: How We Accidentally Planted a Church
                                    </ULink>
                                </li>
                                <li>
                                    <ULink
                                        to="https://www.acts29.com/investing-in-long-term-discipleship-in-rural-guatemala/?fbclid=IwAR38_y99s9utAObUDbEwvCb8C9S1opL--srkzqr5lZ55EiiQkMe7IDwjJWQ"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        Acts 29: Investing in Long‑Term Discipleship in Rural Guatemala
                                    </ULink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </UCard>
        </section>

        <section class="py-12">
            <UCard>
                <div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <div>
                        <h3 class="text-xl font-semibold">Partner With Us</h3>
                        <p class="text-gray-600 dark:text-gray-300">
                            Join a trip, support a project, or create an account to stay connected with what God is
                            doing through local churches in Guatemala.
                        </p>
                    </div>
                    <div class="flex gap-3">
                        <UButton to="/projects" color="primary">See Projects</UButton>
                        <UButton to="/auth/sign-up" variant="soft">Get Involved</UButton>
                    </div>
                </div>
            </UCard>
        </section>
    </div>
</template>
