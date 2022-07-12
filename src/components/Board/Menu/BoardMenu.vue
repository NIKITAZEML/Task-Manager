<template>
    <div class="menu">
        <BoardScalePage/>
        <div class="menu__icons">
            <div class="filter-layer">
                <el-icon @click.native="switchRepresentationTab" class="menu__icon el-icon-s-grid"></el-icon>
                <BaseTemplateModalMenu v-if="renderRepresentation"
                                       :action="representationTabAction"
                                       :filters="filterRepresentation"
                                       heading="Список задач:" @close="switchRepresentationTab"
                                       v-on-clickaway="switchRepresentationTab"
                />
            </div>

            <div class="filter-layer">
                <svg @click="switchTaskTab" class="menu__icon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M23.0504 6.38475C24.318 7.08899 24.318 8.67307 23.0504 9.37731L21.4237 10.281L23.0504 11.1847C24.318 11.889 24.318 13.473 23.0504 14.1773L21.4237 15.081L23.0504 15.9847C24.318 16.689 24.318 18.273 23.0504 18.9773L13.389 24.3447C12.5819 24.7931 11.4203 24.7931 10.6132 24.3447L0.951817 18.9773C-0.315808 18.273 -0.315808 16.689 0.951817 15.9847L2.57852 15.081L0.951817 14.1773C-0.315808 13.473 -0.315808 11.889 0.951817 11.1847L2.5785 10.281L0.951817 9.37731C-0.315808 8.67307 -0.315808 7.08899 0.951817 6.38475L10.6132 1.01731C11.4203 0.568936 12.5819 0.568936 13.389 1.01731L23.0504 6.38475ZM13.389 14.7447L18.9528 11.6538L20.8018 12.681L18.9527 13.7083L16.4818 15.081L12.2234 17.4467C12.1412 17.4924 11.861 17.4924 11.7788 17.4467L7.52042 15.081L5.04947 13.7083L3.20042 12.681L5.04945 11.6538L10.6132 14.7447C11.4203 15.1931 12.5819 15.1931 13.389 14.7447ZM5.04947 16.4538L3.20042 17.481L11.7788 22.2467C11.861 22.2924 12.1412 22.2924 12.2234 22.2467L20.8018 17.481L18.9527 16.4538L13.389 19.5447C12.5819 19.9931 11.4203 19.9931 10.6132 19.5447L5.04947 16.4538ZM11.7788 3.11529C11.861 3.06961 12.1413 3.06961 12.2235 3.11529L20.8018 7.88103L12.2235 12.6468C12.1413 12.6925 11.861 12.6925 11.7788 12.6468L3.20046 7.88103L11.7788 3.11529Z" fill="#838F9F"/>
                </svg>
                <BaseTemplateModalMenu v-if="renderTask"
                                       :action="taskTabAction"
                                       :filters="filterTask"
                                       heading="Отображать задачи:"
                                       @close="switchTaskTab"
                                       v-on-clickaway="switchTaskTab"
                />
            </div>

            <svg v-if="representation === BOARD_REPRESENTATION.GRID" class="menu__icon" width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17 9C17 4.94082 14.7616 2.1235 11.8654 1.27771C11.7605 1.00636 11.5948 0.7541 11.3695 0.54243C10.5997 -0.18081 9.40027 -0.18081 8.63051 0.54243C8.40572 0.753635 8.24021 1.00525 8.13531 1.27592C5.23535 2.11803 3 4.92919 3 9C3 11.6339 2.46898 13.1098 1.48596 14.1793C1.32161 14.3582 0.876316 14.7678 0.574677 15.0453L0.574652 15.0453L0.574646 15.0453L0.574499 15.0454C0.431865 15.1766 0.321381 15.2783 0.287965 15.3119L0 15.604V19.0141H6.08798C6.29384 20.0761 6.87009 20.7867 7.9122 21.4226C9.19414 22.2049 10.8059 22.2049 12.0878 21.4226C13.0075 20.8614 13.6241 19.9989 13.8743 19.0141H20V15.604L19.712 15.3119C19.6817 15.2812 19.5757 15.1834 19.437 15.0555C19.1363 14.7781 18.6823 14.3592 18.5154 14.1769C17.5317 13.1024 17 11.6246 17 9ZM11.7367 19.0141H8.17862C8.3199 19.2769 8.56071 19.4754 8.95402 19.7154C9.59627 20.1073 10.4037 20.1073 11.046 19.7154C11.3434 19.5339 11.5758 19.2937 11.7367 19.0141ZM17.0402 15.5274C17.2506 15.7573 17.7016 16.1774 18 16.4519V17.0141H2V16.4524C2.29607 16.1811 2.74843 15.7613 2.95849 15.5327C4.29422 14.0794 5 12.1178 5 9C5 5.21989 7.33277 3.01238 10 3.01238C12.6597 3.01238 15 5.23129 15 9C15 12.1078 15.706 14.07 17.0402 15.5274Z" fill="#838F9F"/>
            </svg>

            <svg class="menu__icon search" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.74268 19.4854C4.36195 19.4854 0 15.1234 0 9.74268C0 4.36195 4.36195 0 9.74268 0C15.1234 0 19.4854 4.36195 19.4854 9.74268C19.4854 11.9941 18.7216 14.0672 17.4392 15.717L23.9999 22.2778L22.2777 24.0001L15.7169 17.4393C14.0671 18.7217 11.9941 19.4854 9.74268 19.4854ZM17.0497 9.74268C17.0497 13.7782 13.7782 17.0497 9.74268 17.0497C5.70713 17.0497 2.43567 13.7782 2.43567 9.74268C2.43567 5.70713 5.70713 2.43567 9.74268 2.43567C13.7782 2.43567 17.0497 5.70713 17.0497 9.74268Z" fill="#838F9F"/>
            </svg>
        </div>

        <Avatar v-if="!isTablet"/>

        <svg @click="$store.dispatch('user/logout')" class="menu__logout" width="78" height="25" viewBox="0 0 78 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.28 5.02797H4.88C6.27733 5.02797 7.28 5.29463 7.888 5.82797C8.496 6.35063 8.8 7.0813 8.8 8.01997C8.8 8.53197 8.68267 8.99597 8.448 9.41197C8.21333 9.8173 7.85067 10.148 7.36 10.404C7.968 10.6493 8.41067 11.0013 8.688 11.46C8.976 11.9186 9.12 12.4573 9.12 13.076C9.12 14.0893 8.816 14.868 8.208 15.412C7.6 15.956 6.59733 16.228 5.2 16.228H1.28V5.02797ZM2.784 11.14V14.852H5.2C6.064 14.852 6.672 14.6973 7.024 14.388C7.376 14.0786 7.552 13.6146 7.552 12.996C7.552 12.3773 7.376 11.9133 7.024 11.604C6.672 11.2946 6.064 11.14 5.2 11.14H2.784ZM2.784 6.40397V9.79597H4.88C5.744 9.79597 6.352 9.65197 6.704 9.36397C7.056 9.0653 7.232 8.64397 7.232 8.09997C7.232 7.55597 7.056 7.13997 6.704 6.85197C6.352 6.5533 5.744 6.40397 4.88 6.40397H2.784ZM11.1219 8.22797H12.5619V10.788H14.0819C15.2872 10.788 16.1619 11.0333 16.7059 11.524C17.2499 12.004 17.5219 12.6653 17.5219 13.508C17.5219 14.3613 17.2499 15.028 16.7059 15.508C16.1619 15.988 15.2872 16.228 14.0819 16.228H11.1219V8.22797ZM18.6419 8.22797H20.0819V16.228H18.6419V8.22797ZM12.5619 12.1V14.916H14.1619C14.8659 14.916 15.3565 14.7986 15.6339 14.564C15.9112 14.3186 16.0499 13.9666 16.0499 13.508C16.0499 13.0493 15.9112 12.7026 15.6339 12.468C15.3565 12.2226 14.8659 12.1 14.1619 12.1H12.5619ZM25.2812 13.172L23.1533 16.228H21.5213L24.3853 12.132L21.6813 8.22797H23.3133L25.2812 11.124L27.2813 8.22797H28.8813L26.1773 12.148L29.0413 16.228H27.3773L25.2812 13.172ZM33.3688 16.356C32.8034 16.356 32.2914 16.2706 31.8328 16.1C31.3848 15.9186 31.0008 15.668 30.6808 15.348C30.3608 15.0173 30.1154 14.6173 29.9448 14.148C29.7741 13.668 29.6888 13.1293 29.6888 12.532V11.924C29.6888 11.3373 29.7741 10.8093 29.9448 10.34C30.1261 9.85997 30.3768 9.45463 30.6968 9.12397C31.0168 8.7933 31.4008 8.54263 31.8488 8.37197C32.3074 8.19063 32.8141 8.09997 33.3688 8.09997C33.9234 8.09997 34.4248 8.19063 34.8728 8.37197C35.3314 8.54263 35.7208 8.7933 36.0408 9.12397C36.3608 9.44397 36.6061 9.84397 36.7768 10.324C36.9581 10.7933 37.0487 11.3266 37.0487 11.924V12.532C37.0487 13.1293 36.9581 13.6626 36.7768 14.132C36.6061 14.6013 36.3608 15.0013 36.0408 15.332C35.7208 15.6626 35.3314 15.9186 34.8728 16.1C34.4248 16.2706 33.9234 16.356 33.3688 16.356ZM33.3688 14.98C34.0408 14.98 34.5688 14.7773 34.9528 14.372C35.3474 13.956 35.5448 13.3426 35.5448 12.532V11.924C35.5448 11.124 35.3474 10.516 34.9528 10.1C34.5688 9.68397 34.0408 9.47597 33.3688 9.47597C32.6968 9.47597 32.1634 9.68397 31.7688 10.1C31.3848 10.5053 31.1928 11.1133 31.1928 11.924V12.532C31.1928 13.332 31.3848 13.94 31.7688 14.356C32.1634 14.772 32.6968 14.98 33.3688 14.98ZM44.7294 16.228H39.2094V18.308H37.7694V14.916H38.6334C38.804 14.6813 38.9427 14.4413 39.0494 14.196C39.1667 13.94 39.2574 13.6466 39.3214 13.316C39.3854 12.9853 39.428 12.6066 39.4494 12.18C39.4814 11.7426 39.4974 11.2253 39.4974 10.628V8.22797H45.1294V14.916H46.1694V18.308H44.7294V16.228ZM40.9054 10.628C40.9054 11.268 40.8894 11.8173 40.8574 12.276C40.8254 12.7346 40.7774 13.1293 40.7134 13.46C40.6494 13.7906 40.5694 14.0733 40.4734 14.308C40.388 14.532 40.292 14.7346 40.1854 14.916H43.6894V9.53997H40.9054V10.628Z" fill="#838F9F"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M63.2929 7.93507L66.5858 11.228L56 11.228L56 13.228L66.5858 13.228L63.2929 16.5209L64.7071 17.9351L70.4142 12.228L64.7071 6.52086L63.2929 7.93507ZM74 2.22797L70 2.22797L70 4.22797L74 4.22797L74 20.228L70 20.228L70 22.228L74 22.228C75.1046 22.228 76 21.3325 76 20.228L76 4.22797C76 3.1234 75.1046 2.22797 74 2.22797Z" fill="#838F9F"/>
        </svg>

    </div>
</template>

<script>
import Avatar from "@/components/Avatar"
import BaseTemplateModalMenu from "@/components/Board/Menu/BaseTemplateModalMenu"
import BoardScalePage from "@/components/Board/BoardScalePage"
import {mapGetters} from 'vuex'
import {BOARD_REPRESENTATION} from "@/config/app"
import Storage from "@/helpers/storage/Storage"
import {CACHE} from "@/config/app"
import {mixin as clickaway} from 'vue-clickaway'
import {commit} from '@/store'

export default {
    name: 'Menu',
    mixins: [clickaway],
    data: () => ({
        renderTask: false,
        renderRepresentation: false,
        BOARD_REPRESENTATION
    }),
    methods: {
        taskTabAction(value) {
            return new Promise((resolve) => {
                commit('tab/setTaskActive', value)
                Storage.setJson(CACHE.TAB.TASK, value)
                resolve(value)
            })
        },
        representationTabAction(value) {
            return new Promise((resolve) => {
                commit('tab/setRepresentationActive', value)
                Storage.setJson(CACHE.TAB.REPRESENTATION, value)
                resolve(value)
            })
        },
        switchTaskTab() {
            this.renderTask = !this.renderTask
        },
        switchRepresentationTab() {
            this.renderRepresentation = !this.renderRepresentation
        },
    },
    computed: {
        id() {
            return this.$route.params.id
        },
        ...mapGetters({
            isMobile: ['viewport/isMobile'],
            isTablet: ['viewport/isTablet'],
            representation: ['tab/getRepresentationActive']
        }),
        filterTask() {
            return this.$store.getters['tab/getTaskTab']
        },
        filterRepresentation() {
            return this.$store.getters['tab/getRepresentationTab']
        },

    },
    created() {
        const {getters} = this.$store

        const tabs = [
            {key: CACHE.TAB.TASK, entity: getters['tab/getTaskTab']},
            {key: CACHE.TAB.REPRESENTATION, entity: getters['tab/getRepresentationTab']}
        ]

        tabs.map(tab => {
            if (!Storage.isKey(tab.key))
                return
            tab.entity.map(item => item.value === Storage.getJson(tab.key) ?
                item.active = true :
                item.active = false)
        })

    },
    components: {Avatar, BoardScalePage, BaseTemplateModalMenu}
}
</script>

<style scoped lang="scss">
    .menu {@include flex(initial, center);}
    .menu__icons {
        @include flex(initial, center);
        margin: 0 1.66rem 0 0;
    }
    .menu__icon {
        width: 1.25rem;
        height: 1.25rem;
        font-size: 1.5rem;
        cursor: pointer;
        margin: 0 1.25rem 0 0 !important;
        &:last-child {margin: 0;}
        @extend .path-hover;
    }
    .menu__icon.search {display: none;}
    .menu__avatar {
        width: 2.34375rem;
        margin: 0 0 0 2.5rem;
    }
    .menu__logout {
        width: 4.16rem;
        height: 1.25rem;
        cursor: pointer;
        margin: 0 0 0 1.66rem;
        @extend .path-hover;
    }
    .filter-layer {
        position: relative;
        @include flex(initial, flex-end);
    }

    @media only screen and (max-width: 768px) {
        .menu__logout {display: none;}
        .menu__icon.search {display: block;}
        .menu__icons {margin: 0;}
    }

    @media only screen and (max-width: 480px) {
        .menu {width: 100%;}
        .menu__icons {
            width: 100%;
            justify-content: space-between;
        }
    }
</style>
