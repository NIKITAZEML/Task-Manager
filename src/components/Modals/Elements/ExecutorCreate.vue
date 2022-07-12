<template>
    <div class="modal-form-row" v-role="Role.ADMIN">
        <div class="field-wrapper modal-form-grow">
            <SearchExecutors :item="target" @select="props => $emit('select', props)">
                <input autocomplete="off" v-model="target.fullName" id="executor" type="text" class="modal-form-input search-input" placeholder="Ответственный"/>
            </SearchExecutors>
        </div>
        <ButtonAdd @click.native="$emit('add')"/>
    </div>
</template>

<script>

import ButtonAdd from "@/components/Buttons/ButtonAdd"
import SearchExecutors from "@/components/Modals/Elements/search/SearchExecutors"
export default {
    name: 'ExecutorCreate',
    props: {
        target: Object,
    },
    computed: {
        role() {
            return this.$store.getters['user/getRole']
        }
    },
    components: {SearchExecutors, ButtonAdd}
}
</script>
