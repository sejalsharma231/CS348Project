import React, { useState, useEffect } from "react";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import { validateUser } from "../../api/user";
import {
  Box,
  Typography,
  Link,
  Paper,
  Button,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
  TextField,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { getMovies, searchMovies } from "../../api/movies"
import MUIDataTable from "mui-datatables";


const Home = () => {
    const [rows, setRows] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [openSuccess, setSuccess] = useState(false);
    const [openError, setError] = useState(false);


    const handleSearch = async () => {
        console.log("Clicked " + inputText)
        searchMovies(inputText)
            .then(({ data }) => {
                setRows(data);
                console.log(rows)
            })
            .catch((error) => {
                console.log("didn't work")
                console.log(error);
            })
    }

    const [inputText, setInputText] = useState('');
    const CustomToolbar = ({ displayData }) => {
        return (
            <Grid item>
                <TextField
                    label="Search"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
            </Grid>
        );
    }

    const columns = [
        {
            name: "Series_Title",
            label: "Name",
        },
        {
            name: "Released_Year",
            label: "Year",
        },
        {
            name: "Runtime",
            label: "Length",
        },
        {
            name: "Genre",
            label: "Genre",
        }
    ];

    const options = {
        selectableRowsHideCheckboxes: true,
        selectToolbarPlacement: 'none',
        //boolean = false
        filter: false,
        search: false,
        download: false,
        print: false,
        viewColumns: 'false',
        customToolbar: CustomToolbar
    };

    useEffect(() => {
        getMovies()
            .then(({ data }) => {
                //accessing the document markdown
                // data.forEach((row) => {
                //     console.log(row);
                // });
                // console.log(data);
                setRows(data);
                //console.log(rows)
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    // const rows = [
    //     ["1", "Snow", "Jon", "35"]
    // ];

    return (
        <div>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <Button onClick={() => setDialogOpen(true)}>Login</Button>
      </div>
      <CreateDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onError={() => setError(true)}
      />
      <Snackbar
        open={openError}
        autoHideDuration={6000}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Something went wrong!
        </Alert>
      </Snackbar>
            <Paper>
                <Box p={4}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <Typography component="h1" variant="h4"><b>Home</b></Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                Welcome to the home page. Take a look around!
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                <Link to="/otherPage"
                                    component={RouterLink}
                                >
                                    Add Users
                                </Link>
                            </Typography>

                        </Grid>
                    </Grid>
                </Box>
                <div style={{ height: 400, width: '100%' }}>
                    {/* <DataGrid>
                        columns = {columns}
                        rows = {rows}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    </DataGrid> */}
                    <MUIDataTable
                        title={"Movie List"}
                        data={rows}
                        columns={columns}
                        options={options}
                    />
                </div>
            </Paper>
        </div>
    );
};

export default Home;

const CreateDialog = ({ open, onClose, onError }) => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    password: '',
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateUser(newUser.firstName, newUser.lastName, newUser.password)
      .then((response) => {
        navigate("/otherPage");
      })
      .catch((error) => {
        // handle error
        onError();
      });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField
              id="firstName"
              label="First Name"
              variant="filled"
              defaultValue={newUser.firstName}
              onChange={handleChange}
              type="text"
              size="small"
              required
            />
            <TextField
              id="lastName"
              label="Last Name"
              variant="filled"
              defaultValue={newUser.lastName}
              onChange={handleChange}
              type="text"
              size="small"
              required
            />
            <TextField
              id="password"
              label="Password"
              variant="filled"
              defaultValue={newUser.password}
              onChange={handleChange}
              type="text"
              size="small"
              required
            />
            <button type="submit" >Submit</button>
          </FormControl>
        </form>
      </DialogContent>
      <div>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
    </Dialog>
  );
};
