<script setup lang="ts">
    // Fetch the list of blog posts and expose as blogPostList
    const { data: page } = await useAsyncData('BlogPostList', () => queryCollection('content').all());
</script>

<template>
    <div class="container">
        <section class="articles">
            <div class="column is-8 is-offset-2">
                <div v-for="blog in page" :key="blog.path" class="card article">
                    <NuxtLink :to="blog.path">
                        <section class="blog-post-card card article">
                            <div class="media">
                                <div class="media-content has-text-centered">
                                    <h3 class="title article-title has-text-weight-bold">
                                        {{ blog.title }}
                                    </h3>
                                </div>
                            </div>
                            <div class="card-content">
                                <div class="content article-body is-size-5">
                                    {{ blog.description }}
                                </div>
                            </div>
                        </section>
                    </NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>

<style>
    .blog-post-card {
        padding-top: 2.5rem;
        padding-bottom: 3rem;
    }

    .blog-post-card .card-content {
        padding: 1rem;
    }

    .blog-post-card .title {
        margin-bottom: 1rem;
    }
</style>
