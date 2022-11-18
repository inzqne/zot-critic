import logo from '../logo.svg';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Card, Divider, Rating, Box, CardContent, Grid, CardActionArea, CardActions, TextField, Button } from "@mui/material"
import '../App.scss';
import '../globals/hack-styles.scss';




function Reviews() {
    const [menuDict, setMenuDict] = useState({})
  //const [serverText, setServerText] = useState('')

  // use dictionary for items

  async function callBackendAPI() {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  useEffect(() => {
    /*callBackendAPI()
      .then(res => setServerText(res.express))
      .catch(err => console.log(err));*/
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
    console.log(event.currentTarget.id + ' clicked');
  };
  
    return (
    <div className="app fill-view">
      <ul>
        {
        Object.entries(menuDict)
        .map( ([station, value]) => (
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
                                <h3>
                                  {item.name}
                                </h3>
                                <body2>
                                  {item.description}
                                </body2>
                                
                            </CardContent>
                            </CardActionArea>
                              <CardActions>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column',  }}>
                                  <Rating size='large'>

                                  </Rating>
                                  <TextField id="outlined-basic" label="Write a review" variant="outlined" />
                                  <Button>
                                    Submit Review
                                  </Button>
                                </Box>
                              </CardActions>
                          </Card>
                        
                        ))}
                      </Box>
                  </div>
                ))}
          </Card>) )
        }
      </ul>
    </div>
    )
}

export default Reviews