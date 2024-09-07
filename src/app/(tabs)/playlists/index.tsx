import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { defaultStyles } from '@/styles'
import { useNavigationSearch } from 'hooks/useNavigationSearch'
import { ScrollView } from 'react-native-gesture-handler'
import { screenPadding } from '@/constants/tokens'
import { usePlayLists } from '@/store/library'
import { playlistNameFilter } from '@/helpers/filter'
import { useRouter } from 'expo-router'
import { Playlist } from '@/helpers/types'
import { PlaylistsList } from '@/components/PlaylistsList'

const PlaylistsScreen = () => {
	const router = useRouter()
	const search = useNavigationSearch({
		searchBarOptions: {
			hideWhenScrolling: true,
			placeholder: 'Search for playlists',
		},
	})

	const { playlists } = usePlayLists()

	const filteredPlaylists = useMemo(() => {
		return playlists.filter(playlistNameFilter(search))
	}, [playlists, search])

	const handlePlaylistPress = (playlist: Playlist) => {
		router.push(`/(tabs)/playlists/${playlist.name}`)
	}
	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<PlaylistsList
					scrollEnabled={false}
					playlists={filteredPlaylists}
					onPlaylistPress={handlePlaylistPress}
				/>
			</ScrollView>
		</View>
	)
}

export default PlaylistsScreen
