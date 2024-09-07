import { View, Text, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { defaultStyles } from '@/styles'
import library from '@/assets/data/library.json'
import { useNavigationSearch } from 'hooks/useNavigationSearch'
import { screenPadding } from '@/constants/tokens'
import TracksList from '@/components/TracksList'
import { useFavorites } from '@/store/library'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'

const FavoritesScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
		},
	})

	const favoritesTracks = useFavorites().favorites

	const filteredFavoritesTracks = useMemo(() => {
		if (!search) return favoritesTracks

		return favoritesTracks.filter(trackTitleFilter(search))
	}, [search, favoritesTracks])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<TracksList
					scrollEnabled={false}
					tracks={filteredFavoritesTracks}
					id={generateTracksListId('favorites', search)}
				/>
			</ScrollView>
		</View>
	)
}

export default FavoritesScreen
