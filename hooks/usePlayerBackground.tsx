import { colors } from '@/constants/tokens'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { getColors } from 'react-native-image-colors'
import { IOSImageColors, AndroidImageColors } from 'react-native-image-colors/build/types'

export const usePlayerBackground = (imageUrl: string) => {
	const [imageColors, setImageColors] = useState<IOSImageColors | AndroidImageColors | null>(null)

	useEffect(() => {
		getColors(imageUrl, {
			fallback: colors.background,
			cache: true,
			key: imageUrl,
		}).then((colors) => {
			if (Platform.OS === 'ios') {
				setImageColors(colors as IOSImageColors)
			} else if (Platform.OS === 'android') {
				setImageColors(colors as AndroidImageColors)
			} else {
				setImageColors(null)
			}
		})
	}, [imageUrl])

	return { imageColors }
}
