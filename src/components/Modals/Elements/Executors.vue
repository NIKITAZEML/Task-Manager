<template>
    <fragment>
        <div class="modal-form-row" v-for="(executor, i) of executors" :key="i">
            <div class="field-wrapper modal-form-grow">
                <SearchExecutors :item="executor" @select="select">
                    <input v-role.disabled="Role.ADMIN" autocomplete="off" v-model="executor.fullName" :id="executor.id" :key="i" type="text" class="modal-form-input search-input" placeholder="Соисполнитель"/>
                </SearchExecutors>
            </div>
            <ButtonRemove v-role="Role.ADMIN" @click.native="remove(executor)"/>
        </div>
    </fragment>
</template>

<script>

import ButtonRemove from "@/components/Buttons/ButtonRemove"
import SearchExecutors from "@/components/Modals/Elements/search/SearchExecutors"

export default {
    name: 'Executors',
    props: {
        executors: Array
    },
    methods: {
        select({id, fullName, executorId}) {
            const executor = this.executors.find(item => item.id === id)
            executor.fullName = fullName
            executor.id = executorId
            executor.isLocal = true
        },
        remove(executor) {this.$emit('remove', executor)}
    },
    components: {ButtonRemove, SearchExecutors}
}
</script>
