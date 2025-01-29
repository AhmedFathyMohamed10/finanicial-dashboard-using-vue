<!-- src/components/SearchBar.vue -->
<template>
    <div class="search-container">
        <div class="search-bar">
            <i class="fas fa-search search-icon"></i>
            <input type="text" :value="value" @input="$emit('input', $event.target.value)" :placeholder="placeholder"
                class="search-input" />
            <button v-if="value" @click="clearSearch" class="clear-button">
                <i class="fas fa-times"></i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    props: {
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: 'Search...'
        }
    },
    methods: {
        clearSearch() {
            this.$emit('input', '')
        }
    }
}
</script>

<style scoped>
.search-container {
    width: 100%;
    max-width: 500px;
}

.search-bar {
    position: relative;
    width: 100%;
}

.search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #95a5a6;
}

.search-input {
    width: 100%;
    padding: 12px 40px 12px 35px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.3s ease;
    background-color: #fff;
}

.search-input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.clear-button {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #95a5a6;
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.clear-button:hover {
    background-color: #f0f0f0;
    color: #e74c3c;
}
</style>