<template>
    <div>
        <header class="header container">
            <AppLogo/>
            <nav class="header__navmenu">
                <a href="#advantages" class="navmenu__item">Преимущества</a>
                <a href="#principles" class="navmenu__item">Принцип работы</a>
<!--                <router-link to="#" class="navmenu__item">Создание досок</router-link>-->
                <a href="#faq" class="navmenu__item">F.A.Q</a>
            </nav>
            <RedirectTo v-if="!auth" :to="{name: 'login'}" text="Войти"/>
            <RedirectTo v-if="auth" to="/boards" text="Профиль"/>
        </header>
        <div class="section-wrapper" :style="{backgroundImage: `url(${require('@/assets/landing/index.png')})`}">
            <section class="heading container">
                <div class="heading__wrapper">
                    <h2 class="heading__title section-title">Сервис для управления проектами и персональными задачами.</h2>
                    <div class="heading__desc">
                        <div class="desc__text">Простой и гибкий визуальный инструмент для организации работы команды или отдела по методологии канбан.</div>
                        <div class="heading__btns">
                            <router-link v-if="!auth" :to="{name: 'signup'}" class="heading__btn btn-sky">Зарегистрироваться</router-link>
                            <router-link v-if="!auth" :to="{name: 'login'}" class="heading__btn btn-login">Войти</router-link>
                        </div>
                    </div>
                </div>
            </section>
            <section class="preview container">
                <img class="preview__img" src="@/assets/landing/preview.svg" draggable="false"/>
            </section>

            <section id="advantages" class="cards container">
                <div class="card">
                    <img class="card__icon" src="@/assets/landing/icon/1.svg"/>
                    <div class="card__title">Простое создание досок</div>
                    <div class="card__text">Доска — это место для организации ваших задач и для совместной работы с друзьями, семьей и коллегами </div>
                </div>
                <div class="card">
                    <img class="card__icon" src="@/assets/landing/icon/2.svg"/>
                    <div class="card__title">Информативные карточки</div>
                    <div class="card__text">Карточки используются для представления задач и идей. Много вариантов настройки, просмотр в один клик</div>
                </div>
                <div class="card">
                    <img class="card__icon" src="@/assets/landing/icon/3.svg"/>
                    <div class="card__title">Делитесь задачами</div>
                    <div class="card__text">Даже если ваш друг или коллега не зарегистрирован в системе, то вы можете добавить его к доске.</div>
                </div>
                <div class="card">
                    <img class="card__icon" src="@/assets/landing/icon/4.svg"/>
                    <div class="card__title">Онлайн синхронизация</div>
                    <div class="card__text">Если интернета не будет, то прогресс сохраниться и синхронизируется, когда вы будете в сети</div>
                </div>
                <div class="card">
                    <img class="card__icon" src="@/assets/landing/icon/5.svg"/>
                    <div class="card__title">Удобная сортировка</div>
                    <div class="card__text">В совокупности с системой статусов поможет быстро оценить общую картину по задачам </div>
                </div>
                <div class="card download" :style="{backgroundImage: `url(${require('@/assets/landing/download.svg')})`}">
                    <img class="card__icon" src="@/assets/landing/icon/6.svg"/>
                    <div class="card__title">Скачать инструкцию к сервису <span>(2мб)</span></div>
                </div>
            </section>
        </div>

        <section id="principles" class="system container">
            <div class="system__group">
                <div class="system__wrapper">
                    <div class="section-title">Принцип работы системы</div>
                    <div class="section-text">Управление проектами строится по японскому принципу организации производства и снабжения «Канбан».</div>
                    <div class="section-text">Служит он для того, чтобы гарантировать выполнение всех поставленных задач точно в срок. Реализуется с помощью специальных карточек с задачами, которые заполняются и вывешиваются на доску, разбитую на списки. Задачи перемещают от списка к списку по мере выполнения.</div>
                </div>
                <img draggable="false" class="system__img" src="@/assets/landing/system/1.svg"/>
            </div>

            <div class="system__group">
                <img draggable="false" class="system__img" src="@/assets/landing/system/2.svg"/>
                <div class="system__wrapper">
                    <div class="section-title">Система приглашения участников</div>
                    <div class="section-text">Вы можете добавить участников к вашей доске, чтобы вести работу по задачам совместно. Для добавления участников нажмите на иконку плюса. В открывшемся поле найдите человека по нику или по e-mail, и нажмите пригласить.</div>
                    <div class="section-text">Также можно пригласить пользователей с помощью ссылки, это удобно, если вам нужно добавить несколько человек сразу.</div>
                </div>
            </div>
        </section>

        <section id="faq" class="question-layout" :style="{backgroundImage: `url(${require('@/assets/landing/question.png')})`}">
            <div class="question container">
                <div class="question__wrapper">
                    <h2 class="section-title">Часто задаваемые вопросы</h2>
                    <div class="section-text">Если вашего вопроса нет в списке вы можете задать его нажав на кнопку ниже. Мы пришлем вам ответ по почте</div>
                    <div class="btn-sky">Задать свой вопрос</div>
                </div>
                <div class="question__items">
                    <DropDownItem/>
                    <DropDownItem/>
                    <DropDownItem/>
                    <DropDownItem/>
                </div>
            </div>
        </section>

        <section class="links container" v-if="auth">
            <h2 class="section-title">Активные доски</h2>
            <div class="links-wrapper">
                <router-link :to="link.to" class="link-item" v-for="(link, i) of links" :key="i">
                    <div class="link-title">{{link.title}}</div>
                </router-link>
            </div>
        </section>

        <footer class="footer">Землянухин Никита ©</footer>
    </div>
</template>

<script>
import AppLogo from "@/components/AppLogo"
import RedirectTo from "@/components/Buttons/RedirectTo"
const DropDownItem = () => import('@/components/DropDownItem')
import {mapGetters} from 'vuex'
export default {
    data: () => ({
        links: [
            {title: 'Управление информатизации', to: '/board/1'},
            {title: 'Глава МО Воловский район', to: '/board/10'},
            {title: 'Глава Добринского района', to: '/board/9'},
            {title: 'Глава МО Тербунский район', to: '/board/8'},
            {title: 'Главный врач ЦРБ Воловский район', to: '/board/7'},
            {title: 'Главный врач ЦРБ Тербунский район', to: '/board/5'},
            {title: 'Главный врач ЦРБ Добринский район', to: '/board/6'},
            {title: 'Глава администрации Липецкой области', to: '/board/3'},
            {title: 'Начальник Управления здравоохранения', to: '/board/2'},
            {title: 'Заместитель главы администрации (Ильин А.И.)', to: '/board/4'},
        ]
    }),
    computed: mapGetters({auth: ['user/auth']}),
    components: {AppLogo, DropDownItem, RedirectTo}
}

</script>

<style lang="scss" scoped>

.container {width: 74.375rem;}

.section-wrapper {
    border-bottom: 1px solid #E9E9E9;
    background-repeat: no-repeat;
    background-position: 3.5416rem 3.5416rem;
    background-size: 80%;
}
.section-title {
    @include font-size(40, 130%);
    font-weight: 800;
    margin: 0 0 1.66rem 0;
}
.section-text {
    @include font-size(18, 170%);
    margin: 0 0 2.5rem 0;
}
.header {
    @include flex(space-between, center);
    padding: 2.864583rem 0;
}
.navmenu__item {
    @include font-size(18);
    margin: 0 3.385416rem 0 0;
    &:last-child {margin: 0;}
    transition: $transition-default;
    &:hover {color: $color-sky;}
}
.heading {
    width: 62.5rem;
    margin-bottom: 7.8125rem;
}
.heading__title {width: 54.58%;}
.heading__wrapper {@include flex(space-between, flex-start);}
.heading__desc {
    width: 38.58%;
}
.desc__text {
    @include font-size(22, 150%);
    font-family: "PT Root UI", sans-serif;
    margin: 0 0 3.385416rem 0;
}
.heading__btns {@include flex(initial, center);}
.preview {margin-bottom: 2.60416rem;}
.preview__img {
    width: 69.270833rem;
    margin: 0 auto;
}
.cards {
    width: 62.5rem;
    @include flex(space-between, initial, initial, wrap);
}
.card {
    width: 19.635416rem;
    margin: 0 0 3.90625rem 0;
}
.card__icon {
    width: 2.5rem;
    margin: 0 0 1.25rem 0;
}
.card__title {
    @include font-size(22);
    font-weight: 700;
    margin: 0 0 1rem 0;
}
.card__text {
    @include font-size(18, 160%);
    font-family: "PT Root UI", sans-serif;
}
.card.download {
    border-radius: .885416rem;
    padding: 1.25rem 1.614583rem;
    transition: .3s transform ease-in;
    cursor: pointer;
    &:hover {transform: scale(1.03)}
}
.card.download .card__icon {margin: 0 0 2.29166rem 0;}
.card.download .card__title {
    color: white;
    margin: 0;
    span {
        @include font-size(18);
        font-weight: 400;
    }
}
.system {width: 62.5rem;}
.system__img {width: 52.6%;}
.system__group {@include flex(space-between, center);}
.question-layout {
    border-top: 1px solid #E9E9E9;
    padding: 4.947916rem 0;
    background-repeat: no-repeat;
    background-position: center 3.5416rem;
    background-size: 80%;
}
.question {@include flex(space-between);}
.question__wrapper {width: 22rem;}
.question__items {width: 61%;}
.links {
    @include flex(space-between, center, column, wrap);
    padding: 6rem 0;
}
.links-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.link-item {
    width: 32%;
    height: 12rem;
    @include flex(center, center, column);
    border: 1px solid $primary-border;
    border-radius: $br-default;
    text-align: center;
    padding: 2rem;
    margin: 0 0 1.0416rem 0;
    transition: $transition-default;
    &:hover {background-color: $color-light-gray;}
}
.link-title {@include font-size(24);}
.link-text {
    @include font-size(18);
}
.footer {
    @include font-size(18);
    @include flex(center, center);
    height: 4.322916rem;
    border-top: 1px solid #E9E9E9;
}

@media only screen and (max-width: 768px) {
    .container {width: 80%;}
    .header__navmenu {display: none;}
    .heading {margin: 0 auto;}
    .heading__wrapper {flex-direction: column;}
    .heading__title,
    .heading__desc {
        width: 100%;
        text-align: center;
    }
    .heading__btns {display: none;}
    .preview__img {width: 100%;}
    .card {
        width: 48%;
        margin: 0 0 2rem 0;
    }
    .system__group {
        text-align: center;
        &:nth-of-type(1) {flex-direction: column;}
        &:nth-of-type(2) {flex-direction: column-reverse;}
    }
    .system__img {width: 100%;}
    .question {
        text-align: center;
        flex-direction: column;
    }
    .question__wrapper {width: 100%;}
    .question__items {width: 100%;}
    .question .btn-sky {margin: 0 auto 2rem auto;}
    .links {display: none;}
}

@media only screen and (max-width: 480px) {
    .container {width: 90%;}
    .card {
        width: 100%;
        @include flex(initial, center, column);
    }
    .card__text {text-align: center;}
}
</style>
