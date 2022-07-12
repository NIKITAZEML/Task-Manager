<template>
    <div class="redirect-page">

        <img class="redirect-bg" src="@/assets/404.svg"/>

        <div class="status">
            <div class="status-code">404</div>
            <div class="status-title">Oops!</div>
            <div class="status-text">Страница не доступна</div>
            <button @click="$router.back()" type="button" class="redirect-btn btn-sky">Вернуться назад</button>
        </div>
    </div>
</template>


<script>
    export default {}
</script>

<style lang="scss" scoped>
    .redirect-page {
        width: 100%;
        height: 100vh;
        position: relative;
    }
    .redirect-bg {
        width: 89.47916rem;
        height: 38.4375rem;
        @include position(absolute, 0, 8.3rem);
    }
    .status {
        @include position(absolute, 18.75rem, 8.3rem);
    }
    .status-code {
        @include font-size(208);
        color: #EA4335;
        font-weight: bold;
        letter-spacing: .05rem;
    }
    .status-title {
        @include font-size(67);
        margin: 0 0 .6510416rem 0;
    }
    .status-text {
        @include font-size(35);
        margin: 0 0 2.86458rem 0;
    }
    @media only screen and (max-width: 768px) {
        .redirect-page {
            @include flex(center, center);
            position: static;
        }
        .redirect-bg {display: none;}
        .status {position: static;}
    }
</style>
