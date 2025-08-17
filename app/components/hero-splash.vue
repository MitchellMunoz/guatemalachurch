<template>
    <section class="relative isolate w-full overflow-clip" :class="heightClass" role="img" :aria-label="alt">
        <!-- Background image (object-cover) -->
        <!-- If you use @nuxt/image, swap <img> for <NuxtImg> with the same props -->
        <img
            :src="src"
            :alt="alt"
            class="absolute inset-0 h-full w-full object-cover object-center"
            :class="imageClass"
            :style="imageStyle"
            decoding="async"
            loading="eager"
            fetchpriority="high"
        />

        <!-- Optional dark/gradient overlay to improve contrast -->
        <div
            v-if="overlay"
            class="absolute inset-0"
            :class="overlayGradient ? '' : 'bg-black'"
            :style="overlayStyle"
            aria-hidden="true"
        />

        <!-- Foreground content -->
        <div class="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 py-10 sm:px-8">
            <div
                class="w-full"
                :class="[
                    contentWidth === 'lg' ? 'max-w-2xl' : contentWidth === 'xl' ? 'max-w-3xl' : 'max-w-xl',
                    align === 'center'
                        ? 'mx-auto text-center'
                        : align === 'right'
                          ? 'ml-auto text-right'
                          : 'mr-auto text-left',
                ]"
            >
                <slot name="eyebrow">
                    <p v-if="eyebrow" class="mb-3 text-sm font-semibold tracking-wide text-white/90 uppercase">
                        {{ eyebrow }}
                    </p>
                </slot>

                <slot name="title">
                    <h1 v-if="title" class="text-3xl leading-tight font-bold text-white sm:text-4xl md:text-5xl">
                        {{ title }}
                    </h1>
                </slot>

                <slot name="subtitle">
                    <p v-if="subtitle" class="mt-4 text-base/7 text-white/90 sm:text-lg/8">
                        {{ subtitle }}
                    </p>
                </slot>

                <!-- Actions slot -->
                <div
                    class="mt-6 flex flex-wrap gap-3"
                    :class="align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'"
                >
                    <slot name="actions">
                        <UButton
                            v-for="(action, i) in actions"
                            :key="i"
                            :color="
                                (action.color as
                                    | 'primary'
                                    | 'secondary'
                                    | 'success'
                                    | 'info'
                                    | 'warning'
                                    | 'error'
                                    | 'neutral') ?? 'primary'
                            "
                            :class="action.classes ?? []"
                            :to="action.to"
                            @click="action.onClick?.()"
                        >
                            {{ action.label }}
                        </UButton>
                    </slot>
                </div>
            </div>
        </div>

        <!-- optional bottom fade to help text readability over busy images -->
        <div
            v-if="bottomFade"
            class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent"
        />
    </section>
</template>

<script setup lang="ts">
    interface Action {
        label: string;
        classes?: string[];
        color?: string;
        variant?: string;
        to?: string;
        icon?: string;
        onClick?: () => void;
    }
    const props = withDefaults(
        defineProps<{
            src: string;
            alt?: string;
            title?: string;
            subtitle?: string;
            eyebrow?: string;
            actions?: Action[];
            height?: 'screen' | 'hero' | 'short';
            align?: 'left' | 'center' | 'right';
            contentWidth?: 'md' | 'lg' | 'xl';
            overlay?: boolean;
            overlayOpacity?: number; // 0..1
            overlayGradient?: boolean;
            imageClass?: string;
            imageStyle?: string | Record<string, string>;
            bottomFade?: boolean;
        }>(),
        {
            alt: '',
            title: '',
            subtitle: '',
            eyebrow: '',
            actions: () => [],
            height: 'hero',
            align: 'left',
            contentWidth: 'lg',
            overlay: true,
            overlayOpacity: 0.35,
            overlayGradient: true,
            imageClass: '',
            imageStyle: '',
            bottomFade: true,
        },
    );
    const heightClass = computed(() => {
        switch (props.height) {
            case 'screen':
                return 'min-h-screen';
            case 'short':
                return 'h-[40vh] min-h-[380px]';
            default:
                return 'h-[70vh] min-h-[560px]';
        }
    });
    const overlayStyle = computed(() => {
        if (props.overlayGradient) {
            // top-left to bottom-right gradient with tunable opacity
            const o = props.overlayOpacity;
            return {
                background: `linear-gradient(135deg, rgba(0,0,0,${o + 0.15}) 0%, rgba(0,0,0,${o}) 40%, rgba(0,0,0,${Math.max(o - 0.15, 0)}) 100%)`,
            };
        }
        return { opacity: String(props.overlayOpacity) };
    });
</script>

<style scoped>
    /* Helps avoid layout shift while the image decodes */
    section {
        contain: content;
    }
</style>
