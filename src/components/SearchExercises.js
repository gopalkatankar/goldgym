import React from 'react'
import { useEffect,useState } from 'react';
import {Box,Stack,Typography,TextField,Button} from '@mui/material'
import { fetchData,exerciseOptions} from '../utils/fetchData';
import HorizontalScrollbar from "./HorizontalScrollbar"
const SearchExercises = ({SetExercises,bodyPart,setBodyPart}) => {
   const [search,setSearch]=useState('')
   const [bodyParts,setBodyParts]=useState([]);

   
   useEffect(()=>{
      const fetchExercisesData=async()=>{
        const bodyPartsData=await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList',exerciseOptions);

        setBodyParts(['all',...bodyPartsData]);
        
      }
      fetchExercisesData();
   },[])


   const handleSearch= async()=>{
     if(search){
        const exerciseData=await fetchData('https://exercisedb.p.rapidapi.com/exercises',exerciseOptions);
        //this will authorize the api as we used the key

        const searchedExercises=exerciseData.filter(
            (exercise)=>exercise.name.toLowerCase().includes(search)
            ||exercise.target.toLowerCase().includes(search)
            ||exercise.equipment.toLowerCase().includes(search)
            ||exercise.bodyPart.toLowerCase().includes(search)
        );
        //clear the search
        setSearch('')
        SetExercises(searchedExercises);
        //now to show exercises
     } 
   }

  return (
    <Stack alignItems="center" mt="37px"
    justifyContent="center" p="20px">
    
    <Typography fontWeight={700} sx={{
        fontSize:{lg:'44px', xs:'30px'}}} mb="50px" textAlign="center">
        Awesome Exercises You <br/>
        Should Know
    </Typography>
    <Box position="relative" mb="72px">
       <TextField
         sx={{
            input:{fontWeight:'700',
            border:'none',
            borderRadius:'4px'},
            width:{ lg:'800px',xs:'350px'},
            backgroundColor:'white',
            borderRadius:'4px'
         }}
         height="76px"
         value={search}
         onChange={(e)=>setSearch(e.target.value.toLowerCase())}
         placeholder='Search Exercises'
         type='text'
       />

       <Button className='"search-btn'
         sx={{
            bgcolor:'#ff2625',
            color:'#fff',
            textTransform:'none',
            width:{lg:'175px',xs:'80px'},
            fontSize:{lg:'20px',xs:'14px'},
            height:"56px",
            position :"absolute" ,//so the button comes right side of //screen,
            right:'0'
         }}
         onClick={handleSearch}
       >
        Search
       </Button>
    </Box>
    <Box sx={{position:"relative", width:"100%",p:'20px'}}>
        <HorizontalScrollbar data={bodyParts}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart} isBodyParts
        />
    </Box>
    </Stack>
  )
}

export default SearchExercises