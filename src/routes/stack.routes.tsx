import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';
import Welcome from '../pages/Welcome';
import MainMenu from '../pages/MainMenu';
import CrisisAlert from '../pages/CrisisAlert';
import CrisisSequence from '../pages/CrisisSequence';
import ListsOfTasks from '../pages/ListsOfTasks';
import Tasks from '../pages/Tasks';
import BreathingExercises from '../pages/BreathingExercises';
import Distract from '../pages/Distract';
import Write from '../pages/Write';
import Videos from '../pages/Videos';
import Read from '../pages/Read';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            }
        }}
    >
        <stackRoutes.Screen
            name="Welcome"
            component={Welcome}
        />

        <stackRoutes.Screen
            name="MainMenu"
            component={MainMenu}
        />

        <stackRoutes.Screen
            name="CrisisAlert"
            component={CrisisAlert}
        />

        <stackRoutes.Screen
            name="CrisisSequence"
            component={CrisisSequence}
        />

        <stackRoutes.Screen
            name="Write"
            component={Write}
        />

        <stackRoutes.Screen
            name="ListsOfTasks"
            component={ListsOfTasks}
        />

        <stackRoutes.Screen
            name="Tasks"
            component={Tasks}
        />

        <stackRoutes.Screen
            name="BreathingExercises"
            component={BreathingExercises}
        />

        <stackRoutes.Screen
            name="Distract"
            component={Distract}
        />

        <stackRoutes.Screen
            name="Videos"
            component={Videos}
        />

        <stackRoutes.Screen
            name="Read"
            component={Read}
        />

    </stackRoutes.Navigator>
)

export default AppRoutes;