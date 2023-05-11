<template>
    <select :value="modelValue" @change="changeSorting">
        <option disabled value="">Выберите из списка</option>
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
    </select>
</template>

<script>
    export default {
        props: {
            modelValue: String,
            options: Array
        },
        methods: {
            changeSorting(e) {
                this.$emit('update:modelValue', e.target.value);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>