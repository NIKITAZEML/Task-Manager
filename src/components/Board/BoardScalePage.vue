<template>
    <span class="scale" v-if="!isTablet">
        <svg @click="setScale(-delta)" class="scale__btn" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M63.9995 123.042C96.6078 123.042 123.042 96.6078 123.042 63.9995C123.042 31.3913 96.6078 4.95703 63.9995 4.95703C31.3913 4.95703 4.95703 31.3913 4.95703 63.9995C4.95703 96.6078 31.3913 123.042 63.9995 123.042Z" fill="#0079FB"/>
            <path d="M64 128C28.7132 128 0 99.2918 0 64C0 28.7132 28.7132 0 64 0C99.2918 0 128 28.7132 128 64C128 99.2918 99.2918 128 64 128ZM64 9.91475C34.1763 9.91475 9.91475 34.1763 9.91475 64C9.91475 93.8237 34.1763 118.085 64 118.085C93.8237 118.085 118.085 93.8188 118.085 64C118.085 34.1763 93.8237 9.91475 64 9.91475Z" fill="#0079FB"/>
            <path d="M88.7874 68.4658H39.2134C36.4769 68.4658 34.2559 66.2448 34.2559 63.5083C34.2559 60.7718 36.4769 58.5508 39.2134 58.5508H88.7874C91.5289 58.5508 93.7449 60.7718 93.7449 63.5083C93.7449 66.2448 91.5289 68.4658 88.7874 68.4658Z" fill="white"/>
        </svg>
        <svg @click="setScale(delta)" class="scale__btn" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M64 123.043C96.6083 123.043 123.043 96.6083 123.043 64C123.043 31.3917 96.6083 4.95752 64 4.95752C31.3917 4.95752 4.95752 31.3917 4.95752 64C4.95752 96.6083 31.3917 123.043 64 123.043Z" fill="#0079FB"/>
            <path d="M64 128C28.7132 128 0 99.2918 0 64C0 28.7132 28.7132 0 64 0C99.2918 0 128 28.7132 128 64C128 99.2918 99.2918 128 64 128ZM64 9.91475C34.1763 9.91475 9.91475 34.1763 9.91475 64C9.91475 93.8237 34.1763 118.085 64 118.085C93.8237 118.085 118.085 93.8188 118.085 64C118.085 34.1763 93.8237 9.91475 64 9.91475Z" fill="#0079FB"/>
            <path d="M64 93.2981C61.2635 93.2981 59.0425 91.0821 59.0425 88.3406V38.7666C59.0425 36.0301 61.2635 33.8091 64 33.8091C66.7365 33.8091 68.9575 36.0301 68.9575 38.7666V88.3406C68.9575 91.0821 66.7365 93.2981 64 93.2981Z" fill="white"/>
            <path d="M88.7869 68.5112H39.2129C36.4764 68.5112 34.2554 66.2902 34.2554 63.5537C34.2554 60.8172 36.4764 58.5962 39.2129 58.5962H88.7869C91.5284 58.5962 93.7444 60.8172 93.7444 63.5537C93.7444 66.2902 91.5284 68.5112 88.7869 68.5112Z" fill="white"/>
        </svg>
    </span>
</template>

<script lang="ts">
import {Component, Watch} from 'vue-property-decorator'
import Vue from 'vue'
import {getters} from '@/store'
import {EventBus} from "@/main"
import {EventSystem} from "@/config/event.ts"

@Component
export default class BoardScalePage extends Vue {

    private defaultZoom: number = 1
    private minZoom: number = 0.6
    private maxZoom: number = 1.4
    private delta: number = 0.05
    private scale: number = null

    private get isTablet(): boolean {return getters['viewport/isTablet']}

    @Watch('scale')
    scaleTrigger() {
        const {scale, maxZoom, minZoom} = this
        if (scale > maxZoom) this.scale = maxZoom
        if (scale < minZoom) this.scale = minZoom
    }

    public bootstrapScale(): void {
        const currentZoom: number = +(+localStorage.getItem('scale')).toFixed(1)
        this.scale = Number.isFinite(currentZoom) && (currentZoom >= this.minZoom && currentZoom <= this.maxZoom) ?
            currentZoom :
            currentZoom > this.maxZoom ? this.maxZoom : this.minZoom
        document.body.style.zoom = this.scale.toString()
    }

    public setScale(acc: number): void {
        this.scale = this.scale + acc
        document.body.style.zoom = this.scale.toString()
        localStorage.setItem('scale', this.scale.toString())
        EventBus.$emit(EventSystem.BOARD_REARRANGE)
    }

    mounted() {
        this.bootstrapScale()
    }

}

</script>

<style lang="scss" scoped>
.scale {
    display: flex;
    margin: 0 1.25rem 0 0;
}
.scale__btn {
    width: 1.5rem;
    margin: 0 1rem 0 0;
    cursor: pointer;
    &:last-child {margin: 0;}
    transition: .4s all ease-in-out;
    &:hover {transform: scale(1.3);}
    path {transition: inherit;}
    &:hover path[fill="white"] {fill: $color-sky;}
    &:hover path {
        stroke: $color-sky;
        fill: transparent;
    }
}
</style>
