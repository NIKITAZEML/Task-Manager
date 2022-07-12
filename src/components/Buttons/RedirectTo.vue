<template>
    <router-link :to="to">
        <button class="btn-white" type="button">{{text}}</button>
    </router-link>
</template>

<script>
export default {
    name: 'RedirectTo',
    props: {
        to: {
            type: [String, Object],
            default: () => '/'
        },
        text: {
            type: String,
            required: true
        }
    }
}
</script>
