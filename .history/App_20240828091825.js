import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Draft from './components/Draft';
import LoginForm from './components/LoginForm';
import ScoreDash from './components/Dashboard';
import LogoutForm from './components/LogoutForm';
import SignUpForm from './components/SignUpForm';
import Individual from './components/Individual';
import Matchups from './components/Matchups'
import ListMatchups from './components/ListMatchups'

import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();


function App() {
   
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{
                    tabBarStyle: { 
                        backgroundColor: '#000000',
                        borderTopWidth: 0,
                    },
                    tabBarActiveTintColor: '#00ffc7',
                    tabBarInactiveTintColor: 'white',
                    tabBarLabelStyle: {
                        fontSize: 14,
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="american-football-outline" color={color} size={15} />
                    ),
                    headerShown: false, // Hide the header for all screens
        }}>
                <Tab.Screen name="LoginForm" component={LoginForm} options={{ 
                        tabBarStyle: { display: 'none'},
                        tabBarButton: () => null 
                    }}/>
                <Tab.Screen name="Dashboard" component={ScoreDash}/>
                <Tab.Screen name="Draft" component={Draft} options={{ tabBarButton: () => null }}/>
                <Tab.Screen name="Matchups" component={Matchups}/>
                <Tab.Screen name="Logout" component={LogoutForm}/>
                {/* <Tab.Screen name="ListMatchups" component={ListMatchups}/> */}
                <Tab.Screen name="SignUpForm" component={SignUpForm} options={{ tabBarStyle: { display: 'none'}, tabBarButton: () => null }}/>
                <Tab.Screen name="Individual" component={Individual} options={{ tabBarButton: () => null }}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default App
