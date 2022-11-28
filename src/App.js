import './App.css';
import React,{ useState,useEffect} from 'react';
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

const ApiService=async() =>{
 
  const response= await axios.get(URL)
  
    setUserData({...userData,
      fullName:`${response.data.results[0].name.title} ${response.data.results[0].name.first} ${response.data.results[0].name.last}`,
      email:  response.data.results[0].email,
  })
}
useEffect(()=>{
  ApiService();
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[]);


const handleRefresh=()=>{
ApiService()
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
