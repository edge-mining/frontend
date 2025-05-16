<template>
  <div class="relative" v-click-outside="closeDropdown" ref="dropdown">
    <!-- Dropdown Trigger Button -->
    <button @click="toggleDropdown" :class="buttonClass">
      <slot name="icon">
        <!-- Default icon -->
        <HorizontalDots />
      </slot>
    </button>

    <!-- Dropdown Menu -->
    <div v-if="open" :class="menuClass">
      <slot name="menu">
        <!-- Default menu items -->
        <template v-for="(item, index) in menuItems">
          <router-link
            v-if="item.to"
            :key="`router-${index}`"
            :to="item.to"
            @click.native="handleMenuItemClick(item.onClick)"
            :class="itemClass"
          >
            {{ item.label }}
          </router-link>

          <button
            v-else
            :key="`button-${index}`"
            @click="handleMenuItemClick(item.onClick)"
            :class="itemClass"
          >
            {{ item.label }}
          </button>
        </template>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import vClickOutside from './v-click-outside.vue'
import { HorizontalDots } from '../icons';

const props = defineProps({
  menuItems: {
    type: Array,
    default: () => [],
  },
  buttonClass: {
    type: String,
    default: 'text-gray-500 dark:text-gray-400',
  },
  menuClass: {
    type: String,
    default:
      'absolute right-0 z-40 w-40 p-2 space-y-1 bg-white border border-gray-200 top-full shadow-lg dark:border-gray-800 dark:bg-gray-dark',
  },
  itemClass: {
    type: String,
    default:
      'flex w-full px-3 py-2 font-medium text-left text-gray-500 text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300',
  },
})

const open = ref(false)

const toggleDropdown = () => {
  open.value = !open.value
}

const closeDropdown = () => {
  open.value = false
}

const handleMenuItemClick = (callback) => {
  if (typeof callback === 'function') {
    callback() // Execute the provided callback function
  }
  closeDropdown() // Close the dropdown after the item is clicked
}
</script>

<script>
export default {
  directives: {
    clickOutside: vClickOutside,
  },
}
</script>
