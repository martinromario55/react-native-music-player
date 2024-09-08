import { View, Text } from 'react-native'
import React, { PropsWithChildren } from 'react'
import TrackPlayer, { Track } from 'react-native-track-player'
import { MenuView } from '@react-native-menu/menu'
import { useFavorites } from '@/store/library'
import { useQueue } from '@/store/queue'
import { match } from 'ts-pattern'
import { useRouter } from 'expo-router'

type TrackShortcutsMenuProps = PropsWithChildren<{ track: Track }>

const TrackShortcutsMenu = ({ track, children }: TrackShortcutsMenuProps) => {
	const router = useRouter()

	const isFavorite = track.rating === 1

	const { toggleTrackFavorite } = useFavorites()
	const { activeQueueId } = useQueue()

	const handlePressAction = (id: string) => {
		match(id)
			.with('add-to-favorites', async () => {
				toggleTrackFavorite(track)

				// if the track is in the fovorites queue, add it
				if (activeQueueId?.startsWith('favorites')) {
					await TrackPlayer.add(track)
				}
			})
			.with('remove-from-favorites', async () => {
				toggleTrackFavorite(track)

				// if the track is in the fovorites queue, remove it
				if (activeQueueId?.startsWith('favorites')) {
					const queue = await TrackPlayer.getQueue()

					const trackToRemove = queue.findIndex((queueTrack) => queueTrack.url === track.url)

					await TrackPlayer.remove(trackToRemove)
				}
			})
			.with('add-to-playlist', () => {
				// It opens the addToPlaylist modal
				// @ts-expect-error it should work
				router.push({ pathname: '(modals)/addToPlaylist', params: { trackUrl: track.url } })
			})
			.otherwise(() => console.log(`Unknown menu action ${id}`))
	}

	return (
		<MenuView
			onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
			actions={[
				{
					id: isFavorite ? 'remove-from-favorites' : 'add-to-favorites',
					title: isFavorite ? 'Remove from Favorites' : 'Add to Favoritse',
					image: isFavorite ? 'star.fill' : 'star',
				},
				{
					id: 'add-to-playlist',
					title: 'Add to Playlist',
					image: 'plus',
				},
			]}
		>
			{children}
		</MenuView>
	)
}

export default TrackShortcutsMenu
