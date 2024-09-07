import { create } from 'zustand'

type QueueStore = {
	activeQueueId: string | null
	setActiveQueueueId: (id: string) => void
}

export const useQueueStore = create<QueueStore>()((set) => ({
	activeQueueId: null,
	setActiveQueueueId: (id) => set({ activeQueueId: id }),
}))

export const useQueue = () => useQueueStore((state) => state)
