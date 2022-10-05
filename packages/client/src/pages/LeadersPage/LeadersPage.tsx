import React, {ChangeEvent, useState} from 'react'
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import './styles.scss'

const tempUsers = [
  {userName: "user3", moves: 7, time: "01:05"},
  {userName: "user2", moves: 13, time: "01:30"},
  {userName: "user6", moves: 14, time: "00:48"},
  {userName: "user5", moves: 15, time: "00:37"},
  {userName: "user1", moves: 23, time: "00:30"},
  {userName: "user7", moves: 63, time: "00:55"},
  {userName: "user4", moves: 64, time: "01:23"},
  {userName: "user3", moves: 7, time: "01:05"},
  {userName: "user2", moves: 13, time: "01:30"},
  {userName: "user6", moves: 14, time: "00:48"},
  {userName: "user5", moves: 15, time: "00:37"},
  {userName: "user1", moves: 23, time: "00:30"},
  {userName: "user7", moves: 63, time: "00:55"},
  {userName: "user4", moves: 64, time: "01:23"},
  {userName: "user3", moves: 7, time: "01:05"},
  {userName: "Ты", moves: 13, time: "01:30"},
  {userName: "user6", moves: 14, time: "00:48"},
  {userName: "user5", moves: 15, time: "00:37"},
  {userName: "user1", moves: 23, time: "00:30"},
  {userName: "user7", moves: 63, time: "00:55"},
  {userName: "user4", moves: 64, time: "01:23"},
]


export const LeadersPage = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const handleChangePage = (
      event: ChangeEvent<unknown>,
      newPage: number,
  ) => {
    setPage(newPage);
  };


  return (
      <div className="leaders">
        <h1 className="leaders__title title">Лидеры</h1>
        <div className="leaders__table">
          <TableContainer>
            <Table sx={{minWidth: 650}}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" component="th">Позиция</TableCell>
                  <TableCell align="center" component="th">Игрок</TableCell>
                  <TableCell align="center" component="th">Ходы</TableCell>
                  <TableCell align="center" component="th">Время</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  tempUsers.sort((a, b) => a.moves - b.moves).slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                      .map((usr, index) => {
                        return (
                            <TableRow className={usr.userName === "Ты" ? "userCell" : ""} key={index}>
                              <TableCell sx={{width: 70}} component="td" scope="row"
                                         align="center">
                                {tempUsers.indexOf(usr) + 1}
                              </TableCell>
                              <TableCell sx={{width: 300}} component="td" scope="row"
                                         align="center">
                                {usr.userName}
                              </TableCell>
                              <TableCell component="td" scope="row" align="center">
                                {usr.moves}
                              </TableCell>
                              <TableCell component="td" scope="row" align="center">
                                {usr.time}
                              </TableCell>
                            </TableRow>
                        )
                      })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="leaders__footer">
          <Pagination
              variant="outlined"
              shape="rounded"
              color="primary"
              count={Math.ceil(tempUsers.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
          />
        </div>
      </div>
  )
}
