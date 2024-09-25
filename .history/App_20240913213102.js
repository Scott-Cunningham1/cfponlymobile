import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Draft from './components/Draft';
import LoginForm from './components/LoginForm';
import ScoreDash from './components/Dashboard';
import LogoutForm from './components/LogoutForm';
import SignUpForm from './components/SignUpForm';
import Individual from './components/Individual';
import Scoreboard from './components/Scoreboard';
import Header from './components/Header'


import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();


function App() {
   
    return (
        <SafeAreaProvider style={styles.container}>
                        <Header />
        <NavigationContainer>
            <Tab.Navigator screenOptions={{
                    tabBarStyle: { 
                        backgroundColor: 'black',
                        borderTopWidth: 0,
                    },
                    tabBarActiveTintColor: '#fe813b',
                    tabBarInactiveTintColor: 'white',
                    tabBarLabelStyle: {
                        fontSize: 14,
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="american-football-outline" color={color} size={15} />
                    ),
                    headerShown: false,   
        }}>

                <Tab.Screen name="LoginForm" component={LoginForm} options={{ 
                        tabBarStyle: { display: 'none'},
                        tabBarButton: () => null 
                    }}/>
                <Tab.Screen name="Dashboard" component={ScoreDash}/>
                <Tab.Screen name="Scoreboard" component={Scoreboard}/>
                <Tab.Screen name="Draft" component={Draft} options={{ tabBarButton: () => null }}/>
                <Tab.Screen name="Logout" component={LogoutForm}/>
                <Tab.Screen name="SignUpForm" component={SignUpForm} options={{ tabBarStyle: { display: 'none'}, tabBarButton: () => null }}/>
                <Tab.Screen name="Individual" component={Individual} options={{ tabBarButton: () => null }}/>
            </Tab.Navigator>
        </NavigationContainer>
        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

export default App
