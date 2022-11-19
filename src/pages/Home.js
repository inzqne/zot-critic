import logo from '../transparent_logo.png';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Card, Divider, Rating, Box, CardContent, Grid, CardActionArea, CardActions, TextField, Button } from "@mui/material"
import '../App.scss';
import '../globals/hack-styles.scss';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase_config";



function Home() {
    const reviewsCollectionRef = collection(db, "reviews");
    const [menuDict, setMenuDict] = useState({})

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
        getUserList();
    }, []);

    var menu_dict = {};

    async function getUserList() {
        const response = await fetch('/api/dining');
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

    return (
    <div className="app fill-view">
    <img src={logo}>
    </img>
      <ul>
        {
        Object.entries(menuDict)
        .map( ([station, value]) => (
        <form>
          <Card className='card' sx={{ minWidth: 800 }}>
            <center><h3>
              {station}
            </h3></center>
                {Object.entries(value).map(([category_arr, category]) => (
                  <div>
                    <center><h4>
                      {category.category} 
                    </h4></center>
                    <Divider className='divider' variant="inset"/>
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
                                  <Rating name='rating' size='large'>

                                  </Rating>
                                  <TextField name='review' label='Write a review' variant='outlined' />
                                  <Button onClick={reviewClick}>
                                    Submit Review
                                  </Button>
                                </Box>
                              </CardActions>
                          </Card>
                        
                        ))}
                      </Box>
                  </div>
                ))}
          </Card> </form>) )
        }
      </ul>
    </div>
    )
}

export default Home