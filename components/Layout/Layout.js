import React from 'react';
import Link from 'next/link'
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PeopleIcon from '@material-ui/icons/People';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import SubjectIcon from '@material-ui/icons/Subject';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import useStyles from './styles';



export default function PersistentDrawerLeft({children}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [collapse, setCollapse] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setCollapse(!collapse);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            CRUD Dashboard
          </Typography>
          
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <Link href="/">
                <ListItem button>
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText primary="Students" />
                </ListItem>
            </Link>

            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="Subjects" />
                {collapse ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={collapse} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <Link href="/subjects">
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                        <SubjectIcon />
                        </ListItemIcon>
                        <ListItemText primary="All" />
                    </ListItem>                
                </Link>
                <Link href="/subjects/bengali">
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                        <MenuBookIcon />
                        </ListItemIcon>
                        <ListItemText primary="Bengali" />
                    </ListItem>                
                </Link>
                </List>
            </Collapse>

        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        {children}
      </main>
    </div>
  );
}
