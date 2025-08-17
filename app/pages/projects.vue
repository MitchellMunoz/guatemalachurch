<template>
    <UPage>
        <UPageSection
            headline="Our Work"
            title="Projects"
            description="Partner with us through these initiatives in Guatemala."
            :links="[
                { label: 'Get involved', to: '/contact', color: 'primary' }
            ]"
        />

        <UPageSection>
            <UPageGrid>
                <UPageCard
                    icon="i-heroicons-user-group"
                    title="Child Sponsorship Program"
                    description="Support a child’s education, nutrition, and discipleship through monthly sponsorships."
                    to="/contact"
                />

                <UPageCard
                    icon="i-heroicons-building-office-2"
                    title="Church Construction"
                    description="Help build and renovate local church facilities to serve as centers of worship and community."
                    to="/contact"
                />

                <UPageCard
                    icon="i-heroicons-droplet"
                    title="Water Well Maintenance"
                    description="Maintain wells and expand access to clean water for villages in need."
                    to="/contact"
                />
            </UPageGrid>
        </UPageSection>
    </UPage>
</template>
