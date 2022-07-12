<template>
    <fragment>
        <svg v-if="status === 'В работе'" class="status status-work" width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="3.92084" cy="4.0473" r="3.07904"/></svg>
        <svg v-if="status === 'Требуется помощь'" class="status status-help" width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="3.92084" cy="4.0473" r="3.07904"/></svg>
        <svg v-if="status === 'Отменено' || status === 'Просрочено'" class="status status-error" width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="3.92084" cy="4.0473" r="3.07904"/></svg>
        <svg v-if="status === 'Завершено'" class="status status-done" width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="3.92084" cy="4.0473" r="3.07904"/></svg>
        <svg v-if="status === 'Завершено и подтверждено'" class="status status-confirm" width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="3.92084" cy="4.0473" r="3.07904"/></svg>
    </fragment>
</template>

<script>

export default {
    name: 'TaskStatus',
    props: {
        status: {
            type: [String],
            required: true
        }
    },
}
</script>

<style lang="scss" scoped>
.status {
    width: .416rem;
    height: .416rem;
    @include position(absolute, calc(100% - (.4166rem + .416rem)), .9375rem);
}
.status-work {
    @extend .status;
    fill: #C4C4C4;
}
.status-help {
    @extend .status;
    fill: #FFC107;
}
.status-error {
    @extend .status;
    fill: #EA4335;
}
.status-done {
    @extend .status;
    fill: #0AAF51;
}
.status-confirm {
    @extend .status;
    fill: #01A3FE;
}
</style>
