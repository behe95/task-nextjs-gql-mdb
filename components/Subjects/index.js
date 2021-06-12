import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from './useStyles';

import SubjectsTableHead from './SubjectsTableHead';
import SubjectsTableToolbar from './SubjectsTableToolbar';

import {getComparator,stableSort} from '../../utils/components/table';
import _Modal from '../Modal';
import AddNewSubjectForm from '../AddNewSubject';
import ConfirmationForm from '../ConfirmationForm'

function createData(id,name) {
  return { id,name };
}

// const rows = [
//   createData('Bengali'),
//   createData('English'),
//   createData('Math'),
// ];







const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);







export default function SubjectsTable({getAllSubjectsData,getAllSubjectsLoading,getAllSubjectsError}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedForEdit, setSelectedForEdit] = React.useState(null);
  const [selectedForDelete, setSelectedForDelete] = React.useState(null);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  
  
  React.useEffect(() => {
    if(!getAllSubjectsLoading && !getAllSubjectsError && getAllSubjectsData) {
      const modifiedDataArr = getAllSubjectsData?.getAllSubjects?.map(sub => createData(sub.id,sub.title));

      setRows(r => [...modifiedDataArr])
    }
  },[getAllSubjectsData])

  const onClickEditHandler = (info) => {
    console.log("EDIT ============== ", info);
    setSelectedForEdit(sid => info);
    setOpen(true);
  }

  const onClickDeleteHandler = (info) => {
    console.log("Delete ============== ", info);
    setSelectedForDelete(i => ({...info, __typename: 'Subject'}));
    setOpenConfirmation(true);
  }

  console.log("REDNER SUBJECT============");


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <SubjectsTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
          >
            <SubjectsTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row.id)}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => onClickEditHandler(row)}
                        color="primary" component="span">
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => onClickDeleteHandler(row)}
                        color="secondary" component="span">
                          <DeleteIcon />
                        </IconButton>
                        
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <_Modal
        open={open}
        setOpen={setOpen}
      >
        <AddNewSubjectForm
          open={open}
          setOpen={setOpen}
          selectedForEdit={selectedForEdit}
          setSelected={setSelectedForEdit}
        />
      </_Modal>

      <_Modal
        open={openConfirmation}
        setOpen={setOpenConfirmation}
      >
        <ConfirmationForm
          open={openConfirmation}
          setOpen={setOpenConfirmation}
          selectedForDelete={selectedForDelete}
        />
      </_Modal>
    </div>
  );
}
