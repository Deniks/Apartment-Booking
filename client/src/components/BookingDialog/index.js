import React, {
  useState,
  memo,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from 'react';

import { useSpring, config, animated } from 'react-spring';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiPhoneNumber from 'material-ui-phone-number';
import Grid from '@material-ui/core/Grid';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Transition } from './Transition';
import { Calendar } from '../Calendar';
import { FilterContext } from '../PropertyFilter';
import { Notification } from '../Notification';
import { QuanitySelector } from '../QuanitySelector';
import { useMutation } from '@apollo/react-hooks';
import { ADD_BOOKING } from './graphql';
import { StatusButton } from '../StatusButton';

const useStyles = makeStyles((theme) => ({
  dialog: {
    [theme.breakpoints.down('xs')]: {
      minWidth: '90vw',
    },
  },
  buttonWrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },

  buttonProgress: {
    color: 'green',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const props = (prevProps, nextProps) =>
  prevProps !== nextProps ? true : false;

const PhoneNumber = memo(MuiPhoneNumber, props);

export const BookingDialog = ({ open, setDialog, apartmentName, xs }) => {
  const [addBooking, { data, error, loading }] = useMutation(ADD_BOOKING);
  const status = loading
    ? 'loading'
    : error
    ? 'error'
    : data
    ? 'success'
    : null;
  const searchParams = useContext(FilterContext);
  const classes = useStyles({ data });
  const [notification, setNotification] = useState({
    open: false,
    status: undefined,
  });
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryOfResidence, setCountryOfResidence] = useState('');
  const [number, setPhoneNumber] = useState();
  const [selectedDate, setSelectedDate] = useState([null, null]);
  const [message, setMessage] = useState('');
  const [specialRequest, setSpecialRequest] = useState(false);
  const dialogContent = useRef();
  const dialogContentHeight = open
    ? dialogContent.current.getBoundingClientRect().height
    : null;
  const specialRequestProps = useSpring({
    to: {
      opacity: specialRequest ? 1 : 0,
      position: specialRequest ? 'relative' : 'absolute',
      transform: specialRequest
        ? 'translate3d(0%, 0, 0)'
        : 'translate3d(-200%, 0, 0)',
    },
  });

  const mainFormProps = useSpring({
    to: {
      transform: specialRequest
        ? 'translate3d(0, 0, 0)'
        : 'translate3d(0, 0, 0)',
    },
  });
  const chevronProps = useSpring({
    config: config.wobbly,
    to: {
      transform: specialRequest ? 'rotate(180deg)' : 'rotate(0deg)',
    },
  });
  const handleFullName = (event) => {
    setFullName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleCountry = (event) => {
    setCountryOfResidence(event.target.value);
  };

  const handleDate = (value) => {
    setSelectedDate(value);
  };

  const handlePhoneNumber = (value) => {
    setPhoneNumber(value);
  };
  const handleMessage = (event) => {
    setMessage(event.target.value);
  };
  const handleSpecialRequest = () => {
    setSpecialRequest(!specialRequest);
  };

  const handleClose = useCallback(() => {
    setSpecialRequest(false);
    setDialog(false);
  }, [setDialog]);

  const handleBooking = async (event) => {
    event.preventDefault();
    try {
      const userInput = {
        apartment: apartmentName,
        fullName,
        email,
        number,
        countryOfResidence,
        checkIn: selectedDate[0].toString(),
        checkOut: selectedDate[1].toString(),
        specialRequest: message,
      };

      setNotification({ open: true });

      await addBooking({
        variables: { userInput },
      });
    } catch (error) {
      console.log(`Graphql ERROR => ${error}`);
    }
  };

  useEffect(() => {
    const timer = status === 'success' && setTimeout(() => handleClose(), 1000);

    try {
      if (searchParams !== undefined) {
        setSelectedDate(searchParams.selectedDate);
      }
    } catch (error) {
      console.log('no filter available');
    }
    return () => {
      clearTimeout(timer);
    };
  }, [handleClose, searchParams, status]);

  return (
    <>
      <Notification
        open={notification.open}
        setOpen={setNotification}
        status={status}
      />
      <Dialog
        className={classes.dialog}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle id="form-dialog-title">{apartmentName}</DialogTitle>
        <form onSubmit={handleBooking}>
          <DialogContent
            ref={dialogContent}
            style={{
              overflowX: 'hidden',
              maxHeight: dialogContentHeight,
            }}
          >
            <DialogContentText>
              We will reply you with payment arrangment as soon as possible.
            </DialogContentText>
            <animated.div style={specialRequestProps}>
              <TextField
                id="outlined-multiline-flexible"
                label="Message"
                multiline
                fullWidth
                rows={4}
                value={message}
                onChange={handleMessage}
                variant="outlined"
              />
            </animated.div>
            <animated.div style={mainFormProps}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Full Name"
                type="text"
                value={fullName}
                onChange={handleFullName}
                fullWidth
                required
              />
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                value={email}
                onChange={handleEmail}
                fullWidth
                required
              />
              <PhoneNumber
                defaultCountry={'pt'}
                autoFocus
                margin="dense"
                value={number}
                onChange={handlePhoneNumber}
                fullWidth
                required
              />
              <TextField
                autoFocus
                margin="dense"
                id="country"
                label="Country of residence"
                type="text"
                value={countryOfResidence}
                onChange={handleCountry}
                fullWidth
                required
              />
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <QuanitySelector
                    min={1}
                    max={4}
                    init={1}
                    label="Adults:"
                    boxStyle={xs ? { paddingLeft: 15 } : null}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <QuanitySelector min={0} max={4} init={0} label="Children:" />
                </Grid>
              </Grid>
              <Calendar value={selectedDate} onChange={handleDate} />
            </animated.div>
          </DialogContent>
          <DialogActions>
            <Button
              style={{ marginRight: 'auto' }}
              onClick={handleSpecialRequest}
              color="secondary"
            >
              Special Request
              <animated.div style={chevronProps}>
                <KeyboardArrowUpIcon />
              </animated.div>
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <StatusButton state={status} />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
