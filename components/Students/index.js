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
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import StudentsTableHead from './StudentsTableHead';
import StudentsTableToolbar from './StudentsTableToolbar';
import SubjectMenu from './SubjectMenu'

import {getComparator,stableSort} from '../../utils/components/table';
import _Modal from '../Modal';
import AddNewStudentForm from '../AddNewStudentForm';
import ConfirmationForm from '../ConfirmationForm'
import ConfirmationMultipleDelete from '../ConfirmationMultipleDelete'

import {convertMilliToDate} from '../../utils/misc/moment';

function createData(id, firstname, lastname, email, phone, dob, subjects) {
  let name = firstname + " " + lastname;
  return { id, name, firstname, lastname, email, phone, dob, subjects };
}








const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);







export default function StudentsTable({getAllStudentsData,getAllStudentsLoading,getAllStudentsError}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('email');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [selectedForEdit, setSelectedForEdit] = React.useState(null);
  const [selectedForDelete, setSelectedForDelete] = React.useState(null);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [openMultipleConfirmation, setOpenMultipleConfirmation] = React.useState(false);


  const [search,setSearch] = React.useState("");
  const [searchBy,setSearchBy] = React.useState("firstname");

  React.useEffect(() => {
    if(!getAllStudentsLoading && !getAllStudentsError && getAllStudentsData) {
      const modifiedDataArr = getAllStudentsData?.getAllStudents?.map(sub => createData(
        sub.id,sub.firstname,sub.lastname, sub.email, sub.phone,sub.dob,sub.subjects
      ));

      setRows(r => [...modifiedDataArr])
    }

    

    if (!getAllStudentsLoading && !getAllStudentsError && getAllStudentsData && search !== "") {
      setRows([]);

      const searched_students = getAllStudentsData?.getAllStudents.filter(c => c[`${searchBy}`] && c[`${searchBy}`].toLowerCase().includes(search.toLowerCase()))

      const modified_students = searched_students.map(sub => createData(sub.id,sub.firstname,sub.lastname, sub.email, sub.phone,sub.dob,sub.subjects))

      setRows([...modified_students])
    }


  },[getAllStudentsData,searchBy, search])

  const onClickEditHandler = (info) => {
    setSelectedForEdit(sid => ({...info,subjects: info?.subjects?.map(s => s.id) }));
    setOpen(true);
  }

  const onClickDeleteHandler = (info) => {
    setSelectedForDelete(i => ({...info, __typename: 'Student'}));
    setOpenConfirmation(true);
  }


  const handleMultipleDelete = () => {
    setSelectedForDelete(i => ({__typename: "MultipleStudents", id: selected}))
    setOpenMultipleConfirmation(true);
  }

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

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <StudentsTableToolbar
        search={search}
        setSearch={setSearch}
        searchBy={searchBy}
        setSearchBy={setSearchBy} 
        handleMultipleDelete={handleMultipleDelete} numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
          >
            <StudentsTableHead
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
                  
                  console.log(isItemSelected);

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
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">{convertMilliToDate(row.dob)}</TableCell>
                      <TableCell align="right">
                          {
                            row.subjects.length > 0 ? <SubjectMenu student={row} subjects={row.subjects} /> : null
                          }
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
        <AddNewStudentForm
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

      <_Modal
        open={openMultipleConfirmation}
        setOpen={setOpenMultipleConfirmation}
      >
        <ConfirmationMultipleDelete
          open={openMultipleConfirmation}
          setOpen={setOpenMultipleConfirmation}
          selectedForDelete={selectedForDelete}
          setSelected={setSelected}
        />
      </_Modal>
    </div>
  );
}
