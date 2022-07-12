<template>
    <div class="modal-form-row">
        <div>Добавить исполнителя</div>
        <ButtonAdd @click.native="$emit('add')"/>
    </div>
</template>

<script>

import ButtonAdd from "@/components/Buttons/ButtonAdd"
export default {
    name: 'SubtaskAddExecutor',
    components: {ButtonAdd}
}
</script>
