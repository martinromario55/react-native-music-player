import { TrackWithPlaylist } from '@/helpers/types'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'
import library from '@/assets/data/library.json'

interface LibraryState {
	tracks: TrackWithPlaylist[]
	toggleTrtackFavorite: (track: Track) => void
	addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
	tracks: library,
	toggleTrtackFavorite: () => {},
	addToPlaylist: () => {},
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useFavorites = () => {
	const favorites = useLibraryStore((state) => state.tracks.filter((track) => track.rating === 1))

	const toggleTrtackFavorite = useLibraryStore((state) => state.toggleTrtackFavorite)

	return { favorites, toggleTrtackFavorite }
}
