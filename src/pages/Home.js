import logo from '../transparent_logo.png';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Card, Divider, Rating, Box, CardContent, Grid, CardActionArea, CardActions, TextField, Button, ToggleButtonGroup, ToggleButton, colors} from "@mui/material"
import '../App.scss';
import '../globals/hack-styles.scss';
//import { addDoc, collection } from "firebase/firestore";
//import { db } from "../firebase_config";



function Home() {
    //const reviewsCollectionRef = collection(db, "reviews");
    const [menuDict, setMenuDict] = useState({})
    const [diningHall, setDiningHall] = useState('brandywine')

    async function callBackendAPI() {
        const response = await fetch('/express_backend');
        const body = await response.json();

        if (response.status !== 200) {
        throw Error(body.message) 
        }
        return body;
    };

    /*const createPost = async () => {
        await addDoc(reviewsCollectionRef, {
          title,
          postText,
          author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
        });
        navigate("/");
      };*/

    useEffect(() => {
        getBrandyList();
    }, []);

    var menu_dict = {};

    async function getBrandyList() {
        const response = await fetch('/api/dining?hall=brandywine');
        const body = await response.json();

        if (response.status !== 200) {
        throw Error(body.message) 
        }

        body.all.forEach(element => {
        //console.log(element);     
        menu_dict[element.station] = element.menu;
        });

        setMenuDict(menu_dict);
        console.log(menu_dict);
    }

    async function getAnteateryList() {
        const response = await fetch('/api/dining?hall=anteatery');
        const body = await response.json();

        if (response.status !== 200) {
        throw Error(body.message) 
        }

        body.all.forEach(element => {
        //console.log(element);     
        menu_dict[element.station] = element.menu;
        });

        setMenuDict(menu_dict);
        console.log(menu_dict);
    }

    const cardClick = event => {
        //console.log(event.currentTarget.id + ' clicked');
        /*await addDoc(reviewsCollectionRef, {
            title,
            postText,
            author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
          });
          navigate("/");*/
    };

    async function submitReview(event) {
        /*await addDoc(reviewsCollectionRef, {
            event.currentTarget.name,
            postText,
          });*/
          console.log(event.currentTarget.elements);
        //navigate("/");
    }

    const reviewClick = event => {
        submitReview(event);
    };

    const diningHallChange = event => {
        setDiningHall(event.currentTarget.value);
        if (event.currentTarget.value == 'brandywine')
            getBrandyList();
        else if (event.currentTarget.value == 'anteatery')
            getAnteateryList();
    };

    return (
    <div className="app fill-view">
    <img className="logo" src={logo} size='10%' />
      <ul>
      <Card className='card' sx={{ minWidth: 1025, maxWidth: 1025 }}>
      <center>
        <ToggleButtonGroup
                        className='toggle-button-group'
                        value={diningHall}
                        exclusive
                        onChange={diningHallChange}
                        aria-label="Platform"
                        >
                            <ToggleButton value="brandywine" sx={{ borderRadius: 30, backgroundColor: 'white', color: 'black' }}>Brandywine</ToggleButton>
                            <ToggleButton value="anteatery" sx={{ borderRadius: 30, backgroundColor: 'white', color: 'black' }}>Anteatery</ToggleButton>
            </ToggleButtonGroup>
        </center>
        {
        Object.entries(menuDict)
        .map( ([station, value]) => (
        <div>
            <Box sx={{ border: 1, margin: 2, borderRadius: 2, borderColor: 'rgba(0, 0, 0, 0.12)' }}>
            <center>
                <h3>
                    {station}
                </h3>
            </center>
                {Object.entries(value).map(([category_arr, category]) => (
                  <div>
                    <center><h4>
                      {category.category} 
                    </h4></center>
                    <Divider className='divider' variant="middle"/>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
                      {Object.entries(category.items).map(([item_arr, item]) => (
                        
                          <Card id={item.name} sx={{ maxWidth: 300, minWidth: 300, boxShadow: 0}} className='card' onClick={cardClick}>
                            <CardActionArea>
                            <CardContent>
                                <h3 name={item.name}>
                                  {item.name}
                                </h3>
                                <body2>
                                  {item.description}
                                </body2>
                                
                            </CardContent>
                            </CardActionArea>
                              <CardActions>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column',  }}>
                                  <center>
                                    <Rating name='rating' size='large' sx={{ marginBottom: 3 }}>

                                    </Rating>
                                    <TextField name='review' label='Write a review' variant='outlined' sx={{ marginBottom: 2, minWidth: 250 }} multiline />
                                    <Button onClick={reviewClick} variant='contained' sx={{ color: 'white', backgroundColor: 'black', marginBottom: 1, '&.MuiButton-contained:hover': {
                        backgroundColor: 'black',
                    }}}>
                                        Submit Review
                                    </Button>
                                  </center>
                                </Box>
                              </CardActions>
                          </Card>
                        
                        ))}
                      </Box>
                  </div>
                ))}
          </Box></div>) )
        }
        </Card>
      </ul>
    </div>
    )
}

export default Home