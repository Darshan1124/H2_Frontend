import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import { launchImageLibrary } from 'react-native-image-picker'
import useGlobal from "../core/global"
import Thumbnail from "../common/Thumbnail"
import { useNavigation } from "@react-navigation/native"




function ProfileImage() {
	const uploadThumbnail = useGlobal(state => state.uploadThumbnail)
	const user = useGlobal(state => state.user)

	return (

		<View>

			<TouchableOpacity
				style={{ marginBottom: 20 }}

			>
				<Thumbnail
					url={user.thumbnail}
					size={180}
				/>
				<TouchableOpacity
					onPress={() => {
						launchImageLibrary({ includeBase64: true }, (response) => {
							//utils.log('launchImageLibrary', response)
							if (response.didCancel) return
							const file = response.assets[0]
							uploadThumbnail(file)
						})
					}}>

					<View
						style={{
							position: 'absolute',
							bottom: 0,
							right: 0,
							backgroundColor: '#202020',
							width: 40,
							height: 40,
							borderRadius: 20,
							alignItems: 'center',
							justifyContent: 'center',
							borderWidth: 3,
							borderColor: 'white'
						}}
					>
						<FontAwesomeIcon
							icon='pencil'
							size={15}
							color='#d0d0d0'
						/>
						{/* <Text
					size={15}
					color='#d0d0d0'
				>Pencil</Text> */}
					</View>
				</TouchableOpacity>
			</TouchableOpacity>
		</View>
	)
}


function ProfileLogout() {
	const logout = useGlobal(state => state.logout)

	return (
		<TouchableOpacity
			onPress={logout}
			style={{
				flexDirection: 'row',
				height: 52,
				borderRadius: 26,
				alignItems: 'center',
				justifyContent: 'center',
				paddingHorizontal: 26,
				backgroundColor: '#202020',
				marginTop: 40
			}}
		>
			<FontAwesomeIcon
				icon='right-from-bracket'
				size={20}
				color='#d0d0d0'
				style={{ marginRight: 12 }}
			/>
			{/* <Text
				size={20}
				color='#d0d0d0'
				style={{ marginRight: 12 }}
			>Right-from-bracket</Text> */}
			<Text
				style={{
					fontWeight: 'bold',
					color: '#d0d0d0'
				}}
			>
				Logout
			</Text>
		</TouchableOpacity>
	)
}




// function MyServicesButton() {
//     const navigation = useNavigation(); // Get navigation object
//     const user = useGlobal(state => state.user);

//     const handleMyServicesPress = () => {
//         navigation.navigate('MyServices'); // Navigate to MyServices screen
//     };

//     return (
//         <TouchableOpacity onPress={handleMyServicesPress}>
//             <Text>My Services</Text> {/* Wrap text inside a Text component */}
//         </TouchableOpacity>
//     );
// }




function ProfileworkerScreen() {
	const navigation = useNavigation();

	// function MyServiceButton() {
	// 	navigation.navigate('MyServices');
	// }CreateMyService
	function CreateMyService() {
		console.log("excited to see my services screen");
		// navigation.navigate('MyWorkerServices');
	} CreateMyService
	function MyWorkerProfile() {
		console.log("excited to see your MyWorkerProfile screen");
		navigation.navigate('CompleteWorker');
	}
	const user = useGlobal(state => state.user)
	const worker = useGlobal(state => state.worker);
	const toggleWorker = useGlobal(state => state.toggleWorker);
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					paddingTop: 100
				}}
			>
				<ProfileImage />

				<Text
					style={{
						textAlign: 'center',
						color: '#303030',
						fontSize: 20,
						fontWeight: 'bold',
						marginBottom: 6
					}}
				>
					{user.name}
				</Text>
				<Text
					style={{
						textAlign: 'center',
						color: '#606060',
						fontSize: 14
					}}
				>
					@{user.username}
				</Text>
				{/* <TouchableOpacity onPress={MyServiceButton}>
				<Text>My services</Text>
			</TouchableOpacity> */}



				<TouchableOpacity
					// onPress={MyServiceButton}
					style={{
						flexDirection: 'row',
						height: 52,
						borderRadius: 26,
						alignItems: 'center',
						justifyContent: 'center',
						paddingHorizontal: 26,
						backgroundColor: '#202020',
						marginTop: 40
					}}
				>
					{/* <Text
				size={20}
				color='#d0d0d0'
				style={{ marginRight: 12 }}
			>Right-from-bracket</Text> */}
					<Text
						style={{
							fontWeight: 'bold',
							color: '#d0d0d0'
						}}
					>
						Saved Jobs
					</Text>
				</TouchableOpacity>





				<TouchableOpacity
					onPress={MyWorkerProfile}
					style={{
						flexDirection: 'row',
						height: 52,
						borderRadius: 26,
						alignItems: 'center',
						justifyContent: 'center',
						paddingHorizontal: 26,
						backgroundColor: '#202020',
						marginTop: 40
					}}
				>
					{/* <Text
				size={20}
				color='#d0d0d0'
				style={{ marginRight: 12 }}
			>Right-from-bracket</Text> */}
					<Text
						style={{
							fontWeight: 'bold',
							color: '#d0d0d0'
						}}
					>
						Edit profile to win jobs
					</Text>
				</TouchableOpacity>


				<TouchableOpacity
					onPress={CreateMyService}
					style={{
						flexDirection: 'row',
						height: 52,
						borderRadius: 26,
						alignItems: 'center',
						justifyContent: 'center',
						paddingHorizontal: 26,
						backgroundColor: '#202020',
						marginTop: 40
					}}
				>
					{/* <Text
				size={20}
				color='#d0d0d0'
				style={{ marginRight: 12 }}
			>Right-from-bracket</Text> */}
					<Text
						style={{
							fontWeight: 'bold',
							color: '#d0d0d0'
						}}
					>
						Create Services
					</Text>
				</TouchableOpacity>


				<TouchableOpacity
					onPress={toggleWorker}
					style={{
						flexDirection: 'row',
						height: 52,
						borderRadius: 26,
						alignItems: 'center',
						justifyContent: 'center',
						paddingHorizontal: 26,
						backgroundColor: '#202020',
						marginTop: 40,
					}}>
					<FontAwesomeIcon
						icon={worker ? 'toggle-on' : 'toggle-off'}
						size={20}
						color={worker ? '#00ff00' : '#ff0000'}
						style={{ marginRight: 12 }}
					/>
					<Text
						style={{
							fontWeight: 'bold',
							color: '#d0d0d0',
						}}>
						Toggle Worker
					</Text>
				</TouchableOpacity>

				<ProfileLogout />


			</View>
		</ScrollView>
	)
}

export default ProfileworkerScreen;
