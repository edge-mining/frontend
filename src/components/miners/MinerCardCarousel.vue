<template>
  <div
    class="border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6"
  >
    <div class="flex justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Miners</h3>
      <div class="stocks-slider-outer relative flex items-center gap-1.5">
        <div class="swiper-button-prev" @click="swiperInstance.slidePrev()">
          <IconPrev />
        </div>
        <div class="swiper-button-next" @click="swiperInstance.slideNext()">
          <IconNext />
        </div>
      </div>
    </div>

    <Swiper
      @swiper="onSwiper"
      :modules="modules"
      :slides-per-view="miners.length > 4 ? 4 : miners.length"
      :space-between="20"
      :pagination="false"
      :scrollbar="{ draggable: true }"
    >
      <!-- Miners Item -->
      <SwiperSlide v-for="miner in miners" :key="miner.id" style="width: 375px; margin-right: 20px;">
        <div class="bg-gray-100 p-5 dark:bg-white/[0.03]">
          <div
            class="flex items-center justify-between pb-5 mb-5 border-b border-gray-200 dark:border-gray-800"
          >
            <div class="flex items-center gap-2">
              <div class="w-20">
                <img src="/images/icons/asic-miner.png" alt="miner" />
              </div>

              <div>
                <h3 class="text-base font-semibold text-gray-800 dark:text-white/90">
                  <div class="flex items-center gap-2.5">
                    <span>{{ miner.name }}</span>
                    <span v-if="miner.status !== 'on'" class="relative inline-block w-5 h-5">
                      <span
                        class="absolute w-2 h-2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-error-500 top-1/2 left-1/2"
                        :class="`bg-${['error', 'off', 'stopping'].includes(miner.status) ? 'error-500' : ['on', 'starting'].includes(miner.status) ? 'success-200' : 'warning-500'}`"
                      >
                        <span
                          v-if="['on', 'starting', 'stopping'].includes(miner.status)"
                          class="absolute inline-flex w-4 h-4 rounded-full opacity-75 bg-error-400 -top-1 -left-1 animate-ping"
                          :class="`bg-${['stopping'].includes(miner.status) ? 'error-400' : ['on', 'starting'].includes(miner.status) ? 'success-200' : 'warning-500'}`"
                        >
                        </span>
                      </span>
                    </span>
                  </div>
                </h3>
                <span class="block text-gray-500 text-theme-xs dark:text-gray-400">
                  {{ miner.ip_address }}
                </span>
              </div>
            </div>

            <div>
              <div>
                <h4
                  class="mb-1 font-medium text-right text-gray-700 text-theme-sm dark:text-gray-400"
                >
                  {{ miner.power_consumption ?? '---' }} W
                </h4>
              </div>

              <span
                v-if="miner.status === 'on'"
                class="flex items-center justify-end gap-1 font-medium text-theme-xs text-success-600 dark:text-success-500"
              >
                -- TH/s
              </span>
              <span v-else>
                <span
                  :class="`text-theme-xs ${statusBadgeClass(miner.status)} inline-block px-2 py-0.5 font-medium`"
                  >{{ miner.status }}</span
                >
              </span>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button
              class="flex w-full items-center justify-center border border-gray-300 bg-white p-3 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            >
              Stop
            </button>

            <button
              class="flex items-center justify-center w-full p-3 font-medium text-gray-800 bg-brand-500 dark:bg-brand-500 text-theme-sm shadow-theme-xs dark:hover:bg-brand-600"
            >
              Start
            </button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useMinerStore } from '@/stores/miners'

// Domain
import type { Miner, MinerStatus } from '@/types/miner'

// Composables
import { statusBadgeClass } from '@/composables/miner'

// Components
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { IconPrev, IconNext } from '../../ui_kit/custom/icons/'

const minerStore = useMinerStore()
const { miners } = storeToRefs(minerStore)

const modules = [Navigation]
const swiperInstance = ref({})

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
}

// const onSwiper = (swiper) => {
//   console.log(swiper);npm run start
// };
// const onSlideChange = () => {
//   console.log('slide change');
// };

onMounted(() => {
  minerStore.fetchMiners()
})
</script>
