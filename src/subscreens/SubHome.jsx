import { useEffect, useLayoutEffect } from "react"
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from "react-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import FriendsScreen from "./FriendsScreen"
import useGlobal from "../core/global"
import Thumbnail from "../common/Thumbnail"

function SubHomeScreen({ navigation }) {
	const socketConnect = useGlobal(state => state.socketConnect)
	const socketClose = useGlobal(state => state.socketClose)
	const user = useGlobal(state => state.user)

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false
		})
	}, [])

	

	// useEffect(() => {
	// 	socketConnect()
	// 	return () => {
	// 		socketClose()
	// 	}
	// }, [])

	function onSearch() {
		navigation.navigate('SubSearch')
	}

	function onrequest() {
		navigation.navigate('Requests')
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View style={styles.leftContainer}>
					<Thumbnail
						url={user.thumbnail}
						size={30}
					/>
					<Text style={styles.friendsText}>Connections</Text>
				</View>
				<View style={styles.rightContainer}>
				<TouchableOpacity onPress={onSearch}>
						<FontAwesomeIcon
							style={styles.magnifyingGlassIcon}
							icon='magnifying-glass'
							size={22}
							color='#404040'
						/>
					</TouchableOpacity>
					{/* <TouchableOpacity onPress={onrequest}>
						<FontAwesomeIcon icon={faUserFriends} size={22} color={'#303040'} style={styles.requestsText} />
					</TouchableOpacity> */}
					
				</View>
			</View>
			<FriendsScreen />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop:30
	},
	header: {
		// backgroundColor: '#CCE9FF',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 10,
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	rightContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	friendsText: {
		fontSize: 23,
		color: 'black',
		marginLeft: 10,
	},
	requestsText: {
		marginRight: 3,
		marginLeft:3
	},
	magnifyingGlassIcon: {
		marginRight: 16,
	},
});

export default SubHomeScreen
