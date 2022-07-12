<template>
    <div class="form__files">
        <label class="modal-form-label" for="files">Прикрепляемые файлы</label>
        <div class="form-files">
            <div class="form-upload">
                <div class="upload-ui">
                    <img class="upload-plus" src="@/assets/icon/plus-upload.svg"/>
                    <div class="upload-text">Нажмите для добавления файла</div>
                </div>
                <input v-role.disabled="Role.ADMIN" @change="addFile" name="files" id="files" class="upload-input" type="file" multiple>
            </div>

            <div v-for="(file, i) of parseFiles" :key="i" class="upload-item">
                <svg v-role="Role.ADMIN" @click="remove(file.id)" class="upload-delete" height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m256 512c-141.160156 0-256-114.839844-256-256s114.839844-256 256-256 256 114.839844 256 256-114.839844 256-256 256zm0-475.429688c-120.992188 0-219.429688 98.4375-219.429688 219.429688s98.4375 219.429688 219.429688 219.429688 219.429688-98.4375 219.429688-219.429688-98.4375-219.429688-219.429688-219.429688zm0 0"/><path d="m347.429688 365.714844c-4.679688 0-9.359376-1.785156-12.929688-5.359375l-182.855469-182.855469c-7.144531-7.144531-7.144531-18.714844 0-25.855469 7.140625-7.140625 18.714844-7.144531 25.855469 0l182.855469 182.855469c7.144531 7.144531 7.144531 18.714844 0 25.855469-3.570313 3.574219-8.246094 5.359375-12.925781 5.359375zm0 0"/><path d="m164.570312 365.714844c-4.679687 0-9.355468-1.785156-12.925781-5.359375-7.144531-7.140625-7.144531-18.714844 0-25.855469l182.855469-182.855469c7.144531-7.144531 18.714844-7.144531 25.855469 0 7.140625 7.140625 7.144531 18.714844 0 25.855469l-182.855469 182.855469c-3.570312 3.574219-8.25 5.359375-12.929688 5.359375zm0 0"/></svg>
                <a target="_blank" :href="file.file">
                    <UploadFilesGetIcon v-if="file.name" :ext="getExtension(file.name)"/>
                    <div class="upload-name">{{`${file.title}.${file.extension}`}}</div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>

import {v4 as uuid} from 'uuid'
import UploadFilesGetIcon from "@/components/Modals/Elements/UploadFilesGetIcon"

export default {
    name: 'UploadFiles',
    props: {
        files: {
            type: Array,
            required: true,
        }
    },
    computed: {
        parseFiles() {
            return this.files.map(file => {
                const {name} = file
                let title = this.getFileName(name)
                const extension = this.getExtension(name)
                title = title.length > 15 ? `${title.substr(0, 15)}...` : title
                return {...file, name, title, extension}
            }) || []
        },
    },
    methods: {
        getFileName(name) {
            return name.split('.')[0]
        },
        getExtension(name) {
            const arr = name.split('.')
            return arr[arr.length - 1]
        },
        addFile(e) {
            const file = e.target.files[0]
            file.id = uuid()
            this.$emit('add', file)
        },
        remove(id) {
            this.$emit('remove', id)
        },
    },
    components: {UploadFilesGetIcon}
}
</script>

<style lang="scss" scoped>
.form__files {margin: 0 0 1rem 0;}
.form-upload {
    width: 6.25rem;
    height: 5.2083rem;
    display: flex;
    position: relative;
    border: 1px dashed #C4C4C4;
    transition: $transition-default;
    margin: 0 .833rem 0 0;
    &:hover {border: 1px dashed $color-sky;}
}
.upload-input {
    width: 100%;
    height: 100%;
    @include position(absolute, 0, 0);
    opacity: 0;
}
.upload-ui {
    @include flex(center, center, column);
    text-align: center;
}
.upload-text {
    @include font-size(12);
    color: $color-sky;
}
.form-files {
    display: flex;
    flex-wrap: wrap;
}
.upload-item {
    width: 3.125rem;
    height: 5.2083rem;
    color: #939393;
    text-align: left;
    cursor: pointer;
    margin: 0 1.25rem 1rem 0;
    position: relative;
    &:hover .upload-delete {display: block;}
}
.upload-icon {width: 100%;}
.upload-plus {
    width: .625rem;
    margin: 0 0 .416rem 0;
}
.upload-delete {
    width: .8rem;
    height: .8rem;
    transition: $transition-default;
    path {fill: $color-red;}
    &:hover {transform: scale(1.1);}
    position: absolute;
    right: 0;
    top: 0;
    display: none;
    z-index: $modal-actions-index;
}
.upload-name {
    @include font-size(12);
    word-break: break-word;
    user-select: none;
}
</style>
