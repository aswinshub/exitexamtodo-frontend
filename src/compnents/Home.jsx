import { Box, Button, Checkbox, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import "../compnents/style.css";

const Home = () => {
 

// GET-----------------------------

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3005/todo/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);



  // POST ---------------------------------------
  const [list, setList] = useState({
    discription: "",

 
  });


  const submitForm =()=>{
    axios.post("http://localhost:3005/todo/add",list).then((res) => {
      alert(res.data);
      window.location.reload(false);
    });
   
  }

  // DELETE-------------------------
  function removelist(id) {
    axios
      .delete("http://localhost:3005/todo/remove/" + id)
      .then((res) => {
        alert(res.data);
        window.location.reload(false);
      });
  }



  
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div
      style={{
        margin: "10% 20%",
        textAlign: "center",
        backgroundColor: "white",
        padding: "30px 25px",
        borderRadius: "10px",
      }}
    >




      <Typography variant="h3" style={{ color: "Black" }}>
        Todo App
      </Typography>
      <br />
      <br />
      <TextField
        variant="outlined"
        fullWidth
        label="Add todo item"
        name="discription"
        onChange={(e) => {
          setList({ ...list, discription: e.target.value });
        }}
      />
      <br />
      <br />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={submitForm}
      >
        Add
      </Button>
      <br />
      <br />
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Task Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Completed</MenuItem>
          <MenuItem value={20}>Incomplete</MenuItem>

        </Select>
      </FormControl>
    </Box>

      <br />
      <br />

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Discription</TableCell>
            <TableCell align="right"> Status </TableCell>
            <TableCell align="right"></TableCell>
        
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((val,i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {val.discription}
              </TableCell>
              <TableCell align="right"><Checkbox></Checkbox> </TableCell>
              <TableCell align="right"><DeleteIcon  onClick={() => {
                  removelist(val._id);
                }} style={{cursor:'pointer'}}/></TableCell>
     
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    </div>
  );
};

export default Home;
