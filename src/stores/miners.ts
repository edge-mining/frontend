import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/services/miner';
import type { Miner, MinerCreateSchema, MinerUpdateSchema } from '@/types/miner';

export const useMinerStore = defineStore('miners', () => {
  // State
  const miners = ref<Miner[]>([]);
  const isLoadingList = ref(false);
  const isCreating = ref(false);
  const isDeleting = ref(false);
  const isUpdating = ref(false);
  const isChangingStatus = ref(false);
  const isChanginsActivate = ref(false);
  const error = ref<string | null>(null);


  // A list of "fancy" or interesting names.
  const minerNames: string[] = [
    "Crypto Crusader",
    "Hash Hammer",
    "Block Buster",
    "Digital Digger",
    "Circuit Sage",
    "Byte Baron",
    "Data Dynamo",
    "Pixel Pioneer",
    "Quantum Quasar",
    "Silicon Sorcerer",
    "The Algorithmist",
    "Code Commander",
    "Network Nomad",
    "Genesis Grinder",
    "Blockchain Bard",
    "Wired Wizard",
    "Electric Explorer",
    "The Vault Keeper",
    "Cipher Champion",
    "Binary Buccaneer",
    "The Coin Collector",
    "Fusion Finisher",
    "Logic Lord",
    "Matrix Master",
    "Nebula Navigator",
    "Oracle Operator",
    "Photon Prowler",
    "Plasma Prince",
    "Rune Ranger",
    "Spectrum Striker",
    "Terra Trooper",
    "Vector Voyager",
    "Zenith Zealot",
    "Aether Architect",
    "Cosmic Coder",
    "Drift Driver",
    "Echo Engineer",
    "Flame Forger",
    "Grit Guardian",
    "Horizon Hunter",
    "Ion Illuminator",
    "Joule Juggernaut",
    "Krypton Knight",
    "Lode Lifter",
    "Maelstrom Miner",
    "Nova Nominator",
    "Onyx Overseer",
    "Pulse Pilot",
    "Quanta Quester",
    "Rift Rider",
    "Solar Sentinel",
    "Tidal Tamer",
    "Umbra Usher",
    "Vortex Vanguard",
    "Warp Weaver",
    "Xenon Xerarch",
    "Yield Yeti",
    "Zephyr Zapper",
    "Amber Anchor",
    "Bronze Beacon",
    "Cobalt Captain",
    "Diamond Driller",
    "Emerald Enforcer",
    "Gold Guardian",
    "Iron Innovator",
    "Jade Jouster",
    "Kyanite King",
    "Lapis Liberator",
    "Malachite Mastermind",
    "Nickel Navigator",
    "Opal Operator",
    "Pearl Pathfinder",
    "Quartz Quester",
    "Ruby Ranger",
    "Sapphire Sentinel",
    "Topaz Trooper",
    "Uranium Usher",
    "Volcanic Vanguard",
    "Wolfram Weaver",
    "Xylos Xerarch",
    "Yttrium Yeti",
    "Zircon Zealot",
    "Crimson Core",
    "Azure Apex",
    "Emerald Edge",
    "Golden Gatekeeper",
    "Silver Stream",
    "Bronze Bulwark",
    "Iron Peak",
    "Steel Summit",
    "Titanium Tower",
    "Platinum Pillar",
    "Copper Canyon",
    "Lead Lode",
    "Tin Trench",
    "Zinc Zone",
    "Alloy Alchemist",
    "Metal Monarch",
    "Ore Overlord",
    "Rock Ruler",
    "Stone Sentinel",
    "Gemstone Guardian",
    "Crystal Commander",
    "Mineral Master",
    "Earth Engineer",
    "Cave Captain",
    "Mine Maven",
    "Shaft Sheriff",
    "Tunnel Tyrant",
    "Vein Voyager"
  ];

  // Getters (computed)
  const minerCount = computed(() => miners.value.length);
  const minersById = computed(() => {
    return miners.value.reduce((acc, miner) => {
      acc[miner.id] = miner;
      return acc;
    }, {} as Record<string, Miner>);
  });
  const randomMinerName = computed(() => {
    const randomIndex = Math.floor(Math.random() * minerNames.length);
    return minerNames[randomIndex];
  });

  // Actions
  async function fetchMiners(): Promise<void> {
    isLoadingList.value = true;
    error.value = null;
    try {
      miners.value = await api.getMiners();
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch miners';
      miners.value = []; // Reset on error
      console.error(err);
    } finally {
      isLoadingList.value = false;
    }
  }

  async function fetchMiner(minerId: string): Promise<Miner | null> {
    error.value = null;
    try {
      const miner = await api.getMiner(minerId);
      const index = miners.value.findIndex((m) => m.id === minerId);
      if (index !== -1) {
        miners.value[index] = miner; // Update the local miner status
      } else {
        miners.value.push(miner); // Add to local list if not found
      }
      return miner;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch miner';
      console.error(err);
      return null; // Return null on error
    }
  }

  async function addMiner(minerData: MinerCreateSchema): Promise<Miner> {
    if (isLoadingList.value) {
      return Promise.reject(new Error('Loading miners, please wait'));
    }

    if (isCreating.value) {
      return Promise.reject(new Error('Already creating a miner'));
    }

    isCreating.value = true;
    error.value = null;
    try {
      const newMiner = await api.addMiner(minerData);
      miners.value.push(newMiner); // Add to local list
      return newMiner; // Returns the added miner
    } catch (err: any) {
      error.value = err.message || 'Failed to add miner';
      console.error(err);
      throw err; // Rethrow the error for handling in the component
    } finally {
      isCreating.value = false;
    }
  }

  async function removeMiner(minerId: string) {
    if (isLoadingList.value) {
      return Promise.reject(new Error('Loading miners, please wait'));
    }

    if (isDeleting.value) {
      return Promise.reject(new Error('Already creating a miner'));
    }

    isDeleting.value = true;
    error.value = null;
    try {
      await api.removeMiner(minerId);
      miners.value = miners.value.filter((miner) => miner.id !== minerId); // Remove from local list
    } catch (err: any) {
      error.value = err.message || 'Failed to delete miner';
      console.error(err);
      throw err; // Rethrow the error for handling in the component
    } finally {
      isDeleting.value = false;
    }
  }

  async function updateMiner(minerId: string, minerData: MinerUpdateSchema) {
    if (isLoadingList.value) {
      return Promise.reject(new Error('Loading miners, please wait'));
    }

    if (isUpdating.value) {
      return Promise.reject(new Error('Already updating a miner'));
    }

    isUpdating.value = true;
    error.value = null;
    try {
      const updatedMiner = await api.updateMiner(minerId, minerData);
      const index = miners.value.findIndex((m) => m.id === minerId);
      if (index !== -1) {
        miners.value[index] = { ...miners.value[index], ...updatedMiner }; // Update the local miner status
      } else {
        miners.value.push(updatedMiner); // Add to local list if not found
      }
      return updatedMiner; // Returns the updated miner
    } catch (err: any) {
      error.value = err.message || 'Failed to update miner';
      console.error(err);
      throw err; // Rethrow the error for handling in the component
    } finally {
      isUpdating.value = false;
    }
  }

  async function activateMiner(minerId: string) {
    if (isLoadingList.value) {
      return Promise.reject(new Error('Loading miners, please wait'));
    }

    if (isChanginsActivate.value) {
      return Promise.reject(new Error('Already changing miner status'));
    }

    isChanginsActivate.value = true;
    error.value = null;
    try {
      await api.activateMiner(minerId);
      // Optionally, refresh the miner status after activation
      await fetchMiner(minerId);
    } catch (err: any) {
      error.value = err.message || 'Failed to activate miner';
      console.error(err);
      throw err; // Rethrow the error for handling in the component
    } finally {
      isChanginsActivate.value = false;
    }
  }

  async function deactivateMiner(minerId: string) {
    if (isLoadingList.value) {
      return Promise.reject(new Error('Loading miners, please wait'));
    }

    if (isChanginsActivate.value) {
      return Promise.reject(new Error('Already changing miner status'));
    }

    isChanginsActivate.value = true;
    error.value = null;
    try {
      await api.deactivateMiner(minerId);
      // Optionally, refresh the miner status after deactivation
      await fetchMiner(minerId);
    } catch (err: any) {
      error.value = err.message || 'Failed to deactivate miner';
      console.error(err);
      throw err; // Rethrow the error for handling in the component
    } finally {
      isChanginsActivate.value = false;
    }
  }

  async function startMiner(minerId: string) {
    if (isLoadingList.value) {
      return Promise.reject(new Error('Loading miners, please wait'));
    }

    if (isChangingStatus.value) {
      return Promise.reject(new Error('Already changing miner status'));
    }

    isChangingStatus.value = true;
    error.value = null;
    try {
      await api.startMiner(minerId);
      // Optionally, refresh the miner status after starting
      await fetchMiners();
    } catch (err: any) {
      error.value = err.message || 'Failed to start miner';
      console.error(err);
      throw err; // Rethrow the error for handling in the component
    } finally {
      isChangingStatus.value = false;
    }
  }

  async function stopMiner(minerId: string) {
    if (isLoadingList.value) {
      return Promise.reject(new Error('Loading miners, please wait'));
    }

    if (isChangingStatus.value) {
      return Promise.reject(new Error('Already changing miner status'));
    }

    isChangingStatus.value = true;
    error.value = null;
    try {
      await api.stopMiner(minerId);
      // Optionally, refresh the miner status after stopping
      await fetchMiners();
    } catch (err: any) {
      error.value = err.message || 'Failed to stop miner';
      console.error(err);
      throw err; // Rethrow the error for handling in the component
    } finally {
      isChangingStatus.value = false;
    }
  }

  async function refreshMiner(minerId: string) {
    error.value = null;
    try {
      const miner = await api.getMiner(minerId);
      const index = miners.value.findIndex((m) => m.id === minerId);
      if (index !== -1) {
        miners.value[index] = miner; // Update the local miner status
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to refresh miner status';
      console.error(err);
    }
  }

  return {
    // State
    miners,
    isLoadingList,
    isCreating,
    isDeleting,
    isUpdating,
    isChangingStatus,
    isChanginsActivate,
    error,
    // Getters
    minerCount,
    minersById,
    randomMinerName,
    // Actions
    fetchMiners,
    fetchMiner,
    addMiner,
    removeMiner,
    updateMiner,
    activateMiner,
    deactivateMiner,
    startMiner,
    stopMiner,
    refreshMiner
  };
});
