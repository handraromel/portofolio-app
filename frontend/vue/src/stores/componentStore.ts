import { defineStore } from 'pinia'

export const useComponentStore = defineStore('component', {
  state: () => ({
    isModalOpen: false
  }),
  actions: {
    setModalState(isOpen: boolean) {
      this.isModalOpen = isOpen
    }
  }
})
