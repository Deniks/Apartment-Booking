import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { MiniMenu } from '../../MiniMenu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
  options: {
    position: 'absolute',
    right: 0,
  },
}));

export const Options = ({ name }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const items = [
    {
      Icon: InboxIcon,
      text: 'Share',
      link: null,
    },
    {
      Icon: DraftsIcon,
      text: 'Save',
      link: null,
    },
    {
      Icon: SendIcon,
      text: 'Full View',
      link: `/apartments/${name}`,
    },
  ];
  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-haspopup="true"
        aria-label="settings"
        className={classes.options}
      >
        <MoreVertIcon />
      </IconButton>
      <MiniMenu
        open={anchorEl}
        onClose={() => setAnchorEl(null)}
        items={items}
      />
    </>
  );
};

/**
 * 
 *         <MenuItem dense onClick={handleClose}>
          <Link className={classes.menuItem} to="/">
            Share
          </Link>
        </MenuItem>
        <MenuItem dense onClick={handleClose}>
          <Link className={classes.menuItem} to="/">
            Save
          </Link>
        </MenuItem>
        <MenuItem dense onClick={handleClose}>
          <Link className={classes.menuItem} to={`/apartments/${name}`}>
            Full View
          </Link>
        </MenuItem>
 */
