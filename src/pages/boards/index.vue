<template>
    <BaseAccountTemplate>
        <BoardList/>
    </BaseAccountTemplate>
</template>

<script>
    import BoardList from "@/components/Board/BoardList"
    import BaseAccountTemplate from "@/components/Account/BaseAccountTemplate"

    export default {
        components: {BaseAccountTemplate, BoardList}
    }
</script>

