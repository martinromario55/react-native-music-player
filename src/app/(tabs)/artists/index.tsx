import { View, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native'
import React, { useMemo } from 'react'
import { defaultStyles, utilsStyles } from '@/styles'
import { ScrollView } from 'react-native-gesture-handler'
import { useArtists } from '@/store/library'
import { useNavigationSearch } from 'hooks/useNavigationSearch'
import { artistNameFilter } from '@/helpers/filter'
import FastImage from 'react-native-fast-image'
import { unknownArtistImageUri } from '@/constants/images'
import { Link } from 'expo-router'
import { screenPadding } from '@/constants/tokens'

const ItemSeparatorCompnent = () => {
	return <View style={[utilsStyles.itemSeparator, { marginLeft: 50, marginVertical: 12 }]} />
}

const ArtistsScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find by artist',
		},
	})

	const artists = useArtists()

	const filteredArtists = useMemo(() => {
		if (!search) return artists

		return artists.filter(artistNameFilter(search))
	}, [artists, search])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<FlatList
					data={filteredArtists}
					scrollEnabled={false}
					contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
					ItemSeparatorComponent={ItemSeparatorCompnent}
					ListFooterComponent={ItemSeparatorCompnent}
					ListEmptyComponent={
						<View>
							<Text style={utilsStyles.emptyContentText}>No artists found</Text>

							<FastImage
								source={{
									uri: unknownArtistImageUri,
									priority: FastImage.priority.normal,
								}}
								style={utilsStyles.emptyContentImage}
							/>
						</View>
					}
					renderItem={({ item: artist }) => {
						return (
							<Link href={`/artists/${artist.name}`} asChild>
								<TouchableHighlight activeOpacity={0.8}>
									<View style={styles.artistItemContainer}>
										<View>
											<FastImage
												source={{
													uri: unknownArtistImageUri,
													priority: FastImage.priority.normal,
												}}
												style={styles.artistImage}
											/>
										</View>

										<View style={{ width: '100%' }}>
											<Text numberOfLines={1} style={styles.artistNameText}>
												{artist.name}
											</Text>
										</View>
									</View>
								</TouchableHighlight>
							</Link>
						)
					}}
				/>
			</ScrollView>
		</View>
	)
}

export default ArtistsScreen

const styles = StyleSheet.create({
	artistItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
	},
	artistImage: {
		borderRadius: 32,
		width: 40,
		height: 40,
	},
	artistNameText: {
		...defaultStyles.text,
		fontSize: 17,
		maxWidth: '80%',
	},
})
