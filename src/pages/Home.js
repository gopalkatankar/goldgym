import React from 'react'
import { useState } from 'react'
import { Box } from '@mui/material'

import Exercises from '../components/Exercises'
import SearchExercises from '../components/SearchExercises'
import HeroBanner from '../components/HeroBanner' 
const Home = () => {
  const [exercises,SetExercises]=useState([]);
  const [bodyPart,setBodyPart]=useState('all');
  //home because change in state is shown across all over application
  return (
    <Box>
        <HeroBanner/>
        <SearchExercises 
            SetExercises={SetExercises}
            bodyPart={bodyPart} 
            setBodyPart={setBodyPart}
            />
        <Exercises
            exercises={exercises}
            SetExercises={SetExercises}
            bodyPart={bodyPart} 
        />
    </Box>
  )
}

export default Home