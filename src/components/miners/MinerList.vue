<template>
  <div class="border border-gray-200 bg-white px-5 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="flex justify-between gap-2 mb-4 sm:items-center">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Miner list</h3>
      </div>
      <div>
        <DropdownMenu :menu-items="menuListItems">
          <template #icon>
            <VerticalDots />
          </template>
        </DropdownMenu>
      </div>
    </div>
    <div class="max-w-full custom-scrollbar">
      <table class="w-full">
        <thead>
          <tr class="border-gray-100 border-y dark:border-gray-800">
            <th class="py-3 font-normal text-left">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">Miner</p>
            </th>
            <th class="py-3 font-normal text-left">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">IP Address</p>
            </th>
            <th class="py-3 font-normal text-left">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">Max Hashrate</p>
            </th>
            <th class="py-3 font-normal text-left">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">Max Power (W)</p>
            </th>
            <th class="py-3 font-normal text-left">
              <div class="flex items-center justify-center">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">Enabled</p>
              </div>
            </th>
            <th class="py-3 font-normal text-left">
              <div class="flex items-center justify-center">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">Status</p>
              </div>
            </th>
            <th class="py-3 font-normal text-left">
              <div class="flex items-center justify-center">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">Actions</p>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
          <tr
            v-if="isLoading"
            class="border-t border-gray-100 dark:border-gray-800"
          >
            <td colspan="5" class="py-3">
              <div class="flex items-center justify-center">
                <IconLoading />
              </div>
            </td>
          </tr>
          <tr
            v-else-if="!isLoading && miners.length === 0"
            class="border-t border-gray-100 dark:border-gray-800"
          >
            <td colspan="6" class="py-3">
              <div class="flex items-center justify-center">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                  Miners not found.
                  <a
                    href="#"
                    class="text-brand-500 hover:text-brand-600"
                    @click.prevent="isMinerAddModal = true"
                  >
                    Add a miner
                  </a>
                  if you have one, or set up a
                  <a
                    href="#"
                    class="text-brand-500 hover:text-brand-600"
                    @click.prevent="isMinerAddModal = true;"
                  >
                    Dummy miner
                  </a>
                  if you don't.
                </p>
              </div>
            </td>
          </tr>
          <tr
            v-else
            v-for="miner in miners"
            :key="miner.id"
          >
            <td class="py-3" colspan="1">
              <div class="flex items-center">
                <div class="truncate">
                  <p class="text-theme-sm mb-0.5 truncate font-medium text-gray-700 dark:text-gray-400">
                    {{ miner.name }}
                  </p>
                  <span class="text-gray-500 text-theme-xs dark:text-gray-400">
                    {{ miner.id }}
                  </span>
                </div>
              </div>
            </td>
            <td class="py-3">
              <div class="flex items-center">
                <div>
                  <p class="text-gray-700 text-theme-sm dark:text-gray-400">
                    {{ miner.ip_address }}
                  </p>
                </div>
              </div>
            </td>
            <td class="py-3">
              <div class="flex items-center">
                <div>
                  <p class="text-gray-700 text-theme-sm dark:text-gray-400">
                    {{ miner.hash_rate_max?.value }} {{ miner.hash_rate_max?.unit }}
                  </p>
                </div>
              </div>
            </td>
            <td class="py-3">
              <div class="flex items-center">
                <div>
                  <p class="text-gray-700 text-theme-sm dark:text-gray-400">
                    {{ miner.power_consumption_max }}
                  </p>
                </div>
              </div>
            </td>
            <td class="py-3">
              <div class="flex items-center justify-center">
                <span
                  class="text-theme-xs inline-block h-4 w-full max-w-4 rounded-full border-[1.5px] border-white"
                  :class="miner.active ? 'bg-success-500 dark:border-success-700' : 'bg-error-500 dark:border-gray-900'"
                ></span>
              </div>
            </td>
            <td class="py-3">
              <div class="flex items-center justify-center">
                <span :class="`text-theme-xs ${statusBadgeClass(miner.status)} inline-block px-2 py-0.5 font-medium`">{{ miner.status }}</span>
              </div>
            </td>
            <td class="py-3">
              <div class="flex items-center justify-center">
                <DropdownMenu>
                  <template #menu>
                    <button
                      :key="`button-miner-${miner.id}-update`"
                      @click="showMinerUpdateModal(miner)"
                      class="flex w-full px-3 py-2 font-medium text-left text-gray-500 text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                      Update
                    </button>
                    <button
                      :key="`button-miner-${miner.id}-delete`"
                      @click="deleteMiner(miner)"
                      class="flex w-full px-3 py-2 font-medium text-left text-gray-500 text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                      Delete
                    </button>
                    <button
                      :key="`button-miner-${miner.id}-active`"
                      v-if="!miner.active"
                      @click="activateMiner(miner.id)"
                      class="flex w-full px-3 py-2 font-medium text-left text-gray-500 text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                      Activate
                    </button>
                    <button
                      :key="`button-miner-${miner.id}-deactive`"
                      v-else
                      @click="deactivateMiner(miner.id)"
                      class="flex w-full px-3 py-2 font-medium text-left text-gray-500 text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                      Deactivate
                    </button>
                    <button
                      :key="`button-miner-${miner.id}-start`"
                      v-if="['off', 'starting'].includes(miner.status as MinerStatus)"
                      @click="startMiner(miner)"
                      class="flex w-full px-3 py-2 font-medium text-left text-gray-500 text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                      Start
                    </button>
                    <button
                      :key="`button-miner-${miner.id}-stop`"
                      v-if="['on', 'stopping', 'error', 'unknown'].includes(miner.status as MinerStatus)"
                      @click="stopMiner(miner)"
                      class="flex w-full px-3 py-2 font-medium text-left text-gray-500 text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                      Stop
                    </button>
                  </template>
                </DropdownMenu>
              </div>
            </td>
          </tr>
          <tr
            v-if="error"
            class="border-t border-gray-100 dark:border-gray-800"
          >
            <td colspan="6" class="py-3">
              <div class="flex items-center justify-center">
                <p class="text-red-500 text-theme-sm dark:text-red-400">
                  {{ error }}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <CommonModal v-if="isMinerAddModal" @close="isMinerAddModal = false; resetCreateForm();">
    <template #body>
      <div
        class="no-scrollbar relative flex w-full max-w-[700px] flex-col overflow-y-auto bg-white p-6 dark:bg-gray-900 lg:p-11"
      >
        <!-- close btn -->
        <button
          @click="isMinerAddModal = false"
          class="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300"
        >
          <IconClose />
        </button>
        <div class="px-2 pr-14">
          <h4 class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Add new miner
          </h4>
          <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Insert miner settings.
          </p>
        </div>
        <form class="flex flex-col">
          <div class="px-2 overflow-y-auto custom-scrollbar">
            <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Name
                </label>
                <input
                  type="text"
                  v-model="formCreateData.name"
                  :placeholder="minerStore.randomMinerName"
                  class="dark:bg-dark-900 h-11 w-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  IP Address
                </label>
                <input
                  type="text"
                  v-model="formCreateData.ip_address"
                  placeholder="192.168.1.10"
                  class="dark:bg-dark-900 h-11 w-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Max Hashrate
                </label>
                <input
                  type="number"
                  v-model="formCreateData.hash_rate_max.value"
                  placeholder="3000"
                  class="dark:bg-dark-900 h-11 w-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Hashrate Unit
                </label>
                <select
                  v-model="formCreateData.hash_rate_max.unit"
                  class="dark:bg-dark-900 h-11 w-full appearance-none border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  :class="{ 'text-gray-800 dark:text-white/90': formCreateData.hash_rate_max.unit }"
                >
                  <option value="" disabled selected>Select Option</option>
                  <option value="GH/s">GH/s</option>
                  <option value="TH/s">TH/s</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Max Power (W)
                </label>
                <input
                  type="number"
                  v-model="formCreateData.power_consumption_max"
                  placeholder="3000"
                  class="dark:bg-dark-900 h-11 w-full border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Active
                </label>
                <ToggleSwitch
                  v-model="formCreateData.active"
                  label="Active"
                  class="flex flex-wrap items-center justify-between gap-6 sm:gap-8" />
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <button
              @click="isMinerAddModal = false; resetCreateForm();"
              type="button"
              class="flex w-full justify-center border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Close
            </button>
            <button
              @click="addMiner"
              type="button"
              class="flex w-full justify-center bg-brand-500 px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-brand-600 sm:w-auto"
              :class="formCreateData.name === '' ? 'opacity-50 cursor-not-allowed' : ''"
              :disabled="formCreateData.name === ''"
            >
              Add Miner
            </button>
          </div>
        </form>
      </div>
    </template>
  </CommonModal>
  <CommonModal v-if="isMinerUpdateModal" @close="isMinerUpdateModal = false; resetUpdateForm();">
    <template #body>
      <div
        class="no-scrollbar relative flex w-full max-w-[700px] flex-col overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-11"
      >
        <!-- close btn -->
        <button
          @click="isMinerUpdateModal = false"
          class="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300"
        >
          <svg
            class="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
              fill=""
            />
          </svg>
        </button>
        <div class="px-2 pr-14">
          <h4 class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Update miner
          </h4>
          <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Insert miner settings.
          </p>
        </div>
        <form class="flex flex-col">
          <div class="px-2 overflow-y-auto custom-scrollbar">
            <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Name
                </label>
                <input
                  type="text"
                  v-model="formUpdateData.name"
                  class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  IP Address
                </label>
                <input
                  type="text"
                  v-model="formUpdateData.ip_address"
                  placeholder="192.168.1.10"
                  class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Max Power (W)
                </label>
                <input
                  type="number"
                  v-model="formUpdateData.power_consumption_max"
                  placeholder="3000"
                  class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Active
                </label>
                <ToggleSwitch
                  v-model="formUpdateData.active"
                  label="Active"
                  class="flex flex-wrap items-center justify-between gap-6 sm:gap-8" />
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <button
              @click="isMinerUpdateModal = false; resetUpdateForm();"
              type="button"
              class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Close
            </button>
            <button
              @click="updateMiner()"
              type="button"
              class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-brand-600 sm:w-auto"
            >
              Update Miner
            </button>
          </div>
        </form>
      </div>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Components
import DropdownMenu from '../../ui_kit/tailadmin/common/DropdownMenu.vue'
import CommonModal from "../../ui_kit/custom/common/CommonModal.vue"
import ToggleSwitch from '../../ui_kit/custom/forms/FormElements/ToggleSwitch.vue';
import { VerticalDots, IconLoading, IconClose } from '../../ui_kit/custom/icons';

// Domain
import type { Miner, MinerStatus, MinerCreateSchema, MinerUpdateSchema } from '@/types/miner';
import { useMinerStore } from '@/stores/miners';

// Composables
import { statusBadgeClass } from '@/composables/miner';

const emit = defineEmits([
  'miner-created', 'miner-deleted', 'miner-updated', 'miner-started', 'miner-stopped',
  'miner-activate', 'miner-deactivate', 'cancel'
]);

const props = defineProps<{
  miners: Miner[];
}>();

const minerStore = useMinerStore();
const isLoading = ref(false);
const error = ref<string | null>(null);
const isMinerAddModal = ref(false)
const isMinerUpdateModal = ref(false);
const menuListItems = [
  { label: 'Add a miner', onClick: () => isMinerAddModal.value = true },
];
const formCreateData = ref<MinerCreateSchema>({
  name: '',
  active: true,
  ip_address: '',
  hash_rate_max: {
    value: 0,
    unit: 'TH/s',
  },
  power_consumption_max: null,
});
const minerIdToUpdate = ref<string | null>(null);
const formUpdateData = ref<MinerUpdateSchema>({
  name: '',
  active: true,
  ip_address: '',
  hash_rate_max: {
    value: 0,
    unit: 'TH/s',
  },
  power_consumption_max: null,
});

const resetCreateForm = () => {
  formCreateData.value = {
    name: '',
    active: true,
    ip_address: '',
    hash_rate_max: {
      value: 0,
      unit: 'TH/s',
    },
    power_consumption_max: null,
  };
}

const resetUpdateForm = () => {
  minerIdToUpdate.value = null;
  formUpdateData.value = {
    name: '',
    active: true,
    ip_address: '',
    hash_rate_max: {
      value: 0,
      unit: 'TH/s',
    },
    power_consumption_max: null,
  };
}

const showMinerUpdateModal = (miner: Miner) => {
  minerIdToUpdate.value = miner.id;
  formUpdateData.value = {
    name: miner.name,
    active: miner.active,
    ip_address: miner.ip_address,
    power_consumption_max: miner.power_consumption_max,
  };
  isMinerUpdateModal.value = true;
}

const addMiner = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    await minerStore.addMiner(formCreateData.value);
    isMinerAddModal.value = false;
    emit('miner-created');
    resetCreateForm();
  } catch (err: any) {
      error.value = err.message || 'Failed to create miner.';
  } finally {
      isLoading.value = false;
  }
}

const deleteMiner = async (miner: Miner) => {
  isLoading.value = true;
  error.value = null;
  try {
    await minerStore.removeMiner(miner.id);
    emit('miner-deleted', miner.id);
  } catch (err: any) {
      error.value = err.message || 'Failed to delete miner.';
  } finally {
      isLoading.value = false;
  }
}

const updateMiner = async () => {
  isLoading.value = true;
  error.value = null;
  const minerId = minerIdToUpdate.value;
  try {
    if (!minerId) {
      throw new Error('Miner ID is required for update.');
    }
    await minerStore.updateMiner(minerId, formUpdateData.value);
    emit('miner-updated', minerId);
    resetUpdateForm();
  } catch (err: any) {
      error.value = err.message || 'Failed to update miner.';
  } finally {
      isLoading.value = false;
  }
}

const activateMiner = async (minerId: string) => {
  isLoading.value = true;
  error.value = null;
  try {
    await minerStore.activateMiner(minerId);
    emit('miner-activate', minerId);
  } catch (err: any) {
      error.value = err.message || 'Failed to activate miner.';
  } finally {
      isLoading.value = false;
  }
}

const deactivateMiner = async (minerId: string) => {
  isLoading.value = true;
  error.value = null;
  try {
    await minerStore.deactivateMiner(minerId);
    emit('miner-deactivate', minerId);
  } catch (err: any) {
      error.value = err.message || 'Failed to deactivate miner.';
  } finally {
      isLoading.value = false;
  }
}

const startMiner = async (miner: Miner) => {
  isLoading.value = true;
  error.value = null;
  try {
    await minerStore.startMiner(miner.id);
    emit('miner-started', miner.id);
  } catch (err: any) {
      error.value = err.message || 'Failed to start miner.';
  } finally {
      isLoading.value = false;
  }
}

const stopMiner = async (miner: Miner) => {
  isLoading.value = true;
  error.value = null;
  try {
    await minerStore.stopMiner(miner.id);
    emit('miner-stopped', miner.id);
  } catch (err: any) {
      error.value = err.message || 'Failed to stop miner.';
  } finally {
      isLoading.value = false;
  }
}

</script>

<style scoped>
</style>
