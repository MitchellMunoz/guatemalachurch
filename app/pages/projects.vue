<script setup lang="ts">
    definePageMeta({
        layout: 'brochure', // no 'splash' → no big hero
    });
</script>

<template>
    <UPage>
        <UPageSection
            headline="Our Work"
            title="Projects"
            description="Partner with us through these initiatives in Guatemala."
        />

        <UPageSection>
            <UPageGrid>
                <UPageCard
                    title="Child Sponsorship Program"
                    description="Support a child’s education, nutrition, and discipleship through monthly sponsorships."
                >
                    <template #leading>
                        <img src="/images/sponsorship.jpeg" alt="" class="h-40 w-full rounded-md object-cover" />
                    </template>
                    <template #footer>
                        <UButton to="/contact" color="primary">Get involved</UButton>
                        <UButton to="/projects/sponsorship" variant="ghost">Learn more</UButton>
                    </template>
                </UPageCard>

                <UPageCard
                    title="Church Construction"
                    description="Build and renovate local churches that serve as centers of worship and community."
                >
                    <template #leading>
                        <img src="/images/construction.jpeg" alt="" class="h-40 w-full rounded-md object-cover" />
                    </template>
                    <template #footer>
                        <UButton to="/contact" color="primary">Get involved</UButton>
                        <UButton to="/projects/construction" variant="ghost">Learn more</UButton>
                    </template>
                </UPageCard>

                <UPageCard
                    title="Water Well Maintenance"
                    description="Maintain wells and expand access to clean water for villages in need."
                >
                    <template #leading>
                        <img
                            src="/images/water.png"
                            alt=""
                            class="h-40 w-full rounded-md object-cover object-[60%_35%]"
                        />
                    </template>
                    <template #footer>
                        <UButton to="/contact" color="primary">Get involved</UButton>
                        <UButton to="/projects/water" variant="ghost">Learn more</UButton>
                    </template>
                </UPageCard>
            </UPageGrid>
        </UPageSection>

        <UPageCTA
            title="Ready to partner with us?"
            description="Your support helps children, churches, and communities thrive."
            :links="[{ label: 'Contact us', to: '/contact', color: 'primary' }]"
        />
    </UPage>
</template>
