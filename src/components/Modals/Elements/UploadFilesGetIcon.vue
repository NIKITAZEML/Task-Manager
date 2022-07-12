<template>
    <img class="icon" v-if="extensions.includes(ext)" draggable="false" :src="require(`@/assets/icon/files/${ext}.svg`)"/>
    <img class="icon" v-else draggable="false" src="@/assets/icon/files/default.svg"/>
</template>

<script>
export default {
    name: 'UploadFilesGetIcon',
    props: {
        ext: {
            type: String,
            required: true
        }
    },
    data: () => ({
        extensions: ['doc', 'gif', 'jpg', 'pdf', 'png', 'pptx', 'svg', 'txt', 'xls', 'zip']
    }),
}
</script>

<style lang="scss" scoped>
.icon {
    width: 2.5rem;
    height: 2.5rem;
}
</style>
