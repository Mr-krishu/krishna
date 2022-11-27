import './App.css';
import React,{ useState,useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import axios from 'axios';
const URL="https://randomuser.me/api"
function App() {

const [userData,setUserData]=useState({
  fullName:"",
  email:"",
})

const ApiService=async()=>{
  await axios.get(URL)
  .then((value)=>{
    setUserData({...userData,
      fullName:`${value.data.results[0].name.title} ${value.data.results[0].name.first} ${value.data.results[0].name.last}`,
      email:  value.data.results[0].email,

})
  })
};
useEffect(()=>{
  ApiService();
},[]);


const handleRefresh=()=>{
ApiService();
}

  return (
    <div className="card-container">
     {Object.entries(userData).map(([key,value],index)=>{
      return(
        <Card className='card-box'>
        <CardContent>
          { key==="email"?
        <Button sx={{fontSize:24}}>{value}</Button>:
         <Typography sx={{ fontSize: 44 }} color="text.primary" gutterBottom>
       {value}
      </Typography>
     }
     </CardContent>
    </Card>
      )
     })}
     <Button color="success" variant="contained" onClick={handleRefresh}>Refresh</Button>
    </div>
  );
}

export default App;
