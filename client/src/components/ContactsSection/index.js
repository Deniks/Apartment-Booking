import React, { useState, memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MuiPhoneNumber from 'material-ui-phone-number';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { ContactsItem } from './ContactsItem';

const useStyles = makeStyles((theme) => ({
  contacts: {
    background: '#001d38',
    color: '#fdae5c',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0C6.716 0 0 6.716 0 15c8.284 0 15-6.716 15-15zM0 15c0 8.284 6.716 15 15 15 0-8.284-6.716-15-15-15zm30 0c0-8.284-6.716-15-15-15 0 8.284 6.716 15 15 15zm0 0c0 8.284-6.716 15-15 15 0-8.284 6.716-15 15-15z' fill='%23100621' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");`,
  },
  title: {
    color: 'secondary.main',
  },
  root: {
    marginTop: theme.spacing(5),
  },
  contactsFirstContainer: {
    [theme.breakpoints.down('lg')]: {
      padding: '0 70px 0 70px',
    },
    [theme.breakpoints.down('md')]: {
      padding: '0 20px 0 20px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0 100px 0 100px',
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  contactsSecondContainer: {
    [theme.breakpoints.down('lg')]: {
      paddingLeft: '200px',
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: '100px',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '100px',
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
    },
  },
  inputContainer: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

const props = (prevProps, nextProps) => true;

export const ContactsSection = memo(() => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [message, setMessage] = useState('');

  const classes = useStyles();

  const handlePhoneNumber = (number) => {
    setPhoneNumber(number);
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <section className={classes.contacts}>
      <h1 className={classes.title}>Contact Us</h1>
      <Grid className={classes.root} container spacing={3}>
        {/*  Part 1 */}

        <Grid lg={6} md={6} sm={12} item>
          <Box component="div" className={classes.contactsFirstContainer}>
            <Grid container spacing={3}>
              <Grid xs={12} item>
                <FormControl className={classes.inputContainer}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Message"
                    multiline
                    rows={4}
                    value={message}
                    onChange={handleMessageChange}
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid sm={6} xs={12} item>
                <FormControl
                  className={classes.inputContainer}
                  component="fieldset"
                >
                  <InputLabel htmlFor="full-name">Full Name</InputLabel>
                  <Input id="full-name" aria-describedby="full-name-helper" />
                </FormControl>
              </Grid>
              <Grid sm={6} xs={12} item>
                <FormControl
                  className={classes.inputContainer}
                  component="fieldset"
                >
                  <InputLabel htmlFor="email">Email address</InputLabel>
                  <Input id="email" aria-describedby="email-helper" />
                </FormControl>
              </Grid>
              <Grid sm={11} xs={9} item>
                <FormControl className={classes.inputContainer}>
                  <MuiPhoneNumber
                    defaultCountry={'pt'}
                    onChange={handlePhoneNumber}
                  />
                </FormControl>
              </Grid>
              <Grid xs={1} item>
                <Button variant="contained" color="primary">
                  <i className="fas fa-arrow-right"></i>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/*  Part 2 */}

        <Grid lg={6} md={6} sm={12} item>
          <Box component="div" className={classes.contactsSecondContainer}>
            <Grid container spacing={3}>
              <Grid xs={12} item>
                <ContactsItem
                  icon={<i className="fas fa-home"></i>}
                  value="Buttonwood, California."
                  helperText="Rosemead, CA 91770"
                />
              </Grid>
              <Grid xs={12} item>
                <ContactsItem
                  icon={<i className="fas fa-phone"></i>}
                  value="+1 253 565 2365"
                  helperText="Mon to Fri 9am to 6pm"
                />
              </Grid>
              <Grid xs={12} item>
                <ContactsItem
                  icon={<i className="far fa-envelope"></i>}
                  value="support@colorlib.com"
                  helperText="Send us your query anytime!"
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </section>
  );
}, props);
