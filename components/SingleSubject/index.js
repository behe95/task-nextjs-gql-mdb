import React from 'react';
import {useRouter} from 'next/router';
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

import SingleSubjectTableHead from './SingleSubjectTableHead';
import SingleSubjectTableToolbar from './SingleSubjectTableToolbar';

import {getComparator,stableSort} from '../../utils/components/table';
import _Modal from '../Modal';
import AddNewStudentForm from '../AddNewStudentForm';
import ConfirmationForm from '../ConfirmationForm'

import {useQuery} from '@apollo/client';
import {GET_ALL_STUDENTS_BY_SUBJECT} from '../../apolloClient/queries/students';
import {GET_ALL_SUBJECTS} from '../../apolloClient/queries/subjects';


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




export default function SingleSubjectTable() {
  const router = useRouter();
  const {id} = router.query;

  const {
    data: getAllSubjectsData,
    loading: getAllSubjectsLoading,
    error: getAllSubjectsError
  } = useQuery(GET_ALL_SUBJECTS, {
    fetchPolicy: 'cache-and-network'
  });


  const {
    data: getAllStudentsBySubjectData,
    loading: getAllStudentsBySubjectLoading,
    error: getAllStudentsBySubjectError
  } = useQuery(GET_ALL_STUDENTS_BY_SUBJECT,{
    variables: {subjectId:id},
    fetchPolicy: 'cache-and-network'
  });

  
  

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  const [selectedSubject, setSelectedSubject] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedForEdit, setSelectedForEdit] = React.useState(null);
  const [selectedForDelete, setSelectedForDelete] = React.useState(null);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);


  React.useEffect(() => {
    if(!getAllSubjectsLoading && !getAllSubjectsError){
      const subject = getAllSubjectsData?.getAllSubjects.filter(s => s.id === id);
      setSelectedSubject(subject[0]);
    }

    if(!getAllStudentsBySubjectLoading && !getAllStudentsBySubjectError && getAllStudentsBySubjectData) {
      const modifiedDataArr = getAllStudentsBySubjectData?.getAllStudentsBySubject?.map(sub => createData(
        sub.id,sub.firstname,sub.lastname, sub.email, sub.phone,sub.dob,sub.subjects
      ));

      setRows(r => [...modifiedDataArr])
    }
  },[getAllSubjectsLoading, getAllStudentsBySubjectLoading])


  const onClickEditHandler = (info) => {
    setSelectedForEdit(sid => ({...info,subjects: info?.subjects?.map(s => s.id) }));
    setOpen(true);
  }

  const onClickDeleteHandler = (info) => {
    setSelectedForDelete(i => ({...info, __typename: 'SubjectFromStudent',selectedSubject}));
    setOpenConfirmation(true);
  }


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
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
        <SingleSubjectTableToolbar selectedSubject={selectedSubject} numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
          >
            <SingleSubjectTableHead
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
    </div>
  );
}

