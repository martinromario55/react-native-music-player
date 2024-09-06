import { View, Text, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { defaultStyles } from '@/styles'
import library from '@/assets/data/library.json'
import { useNavigationSearch } from 'hooks/useNavigationSearch'
import { screenPadding } from '@/constants/tokens'
import TracksList from '@/components/TracksList'

const FavoritesScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
		},
	})

	const favoritesTracks = useMemo(() => {
		return library.filter((track) => track.rating === 1)
	}, [])
	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<TracksList scrollEnabled={false} tracks={favoritesTracks} />
			</ScrollView>
		</View>
	)
}

export default FavoritesScreen
