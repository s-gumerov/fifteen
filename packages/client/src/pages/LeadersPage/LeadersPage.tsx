import React, { ChangeEvent, useState, useEffect } from 'react'
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import './styles.scss'
import { TPlayer } from './types'
import { useLeaders } from '../../context/Leaders'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch'
import { getLeaderboardByThunk } from '../../store/leaderboard/leaderboardSlice'
import { leaderboardDefaultQuery } from '../../const'

export const LeadersPage = (): JSX.Element => {
  const [page, setPage] = useState(1)
  const [rowsPerPage] = useState(5)
  const dispatch = useAppDispatch()
  const leadersContext = useLeaders()
  const { user } = useAppSelector(state => state.user)
  const { leaderboard } = useAppSelector(state => state.leaderboard)

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage)
  }

  useEffect(() => {
    if (!leaderboard) {
      dispatch(getLeaderboardByThunk(leaderboardDefaultQuery))
    }
  }, [])

  return (
    <div className="leaders">
      <h1 className="leaders__title title">Лидеры</h1>
      <div className="leaders__table">
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center" component="th">
                  Позиция
                </TableCell>
                <TableCell align="center" component="th">
                  Игрок
                </TableCell>
                <TableCell align="center" component="th">
                  Ходы
                </TableCell>
                <TableCell align="center" component="th">
                  Время
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leadersContext!.leaders &&
                leadersContext!.leaders
                  .slice(
                    (page - 1) * rowsPerPage,
                    (page - 1) * rowsPerPage + rowsPerPage
                  )
                  .map((usr: { data: TPlayer }, index: number) => {
                    return (
                      <TableRow
                        className={usr.data.id === user!.id ? 'userCell' : ''}
                        key={index}>
                        <TableCell
                          sx={{ width: 70 }}
                          component="td"
                          scope="row"
                          align="center">
                          {leadersContext!.leaders &&
                            leadersContext!.leaders.indexOf(usr) + 1}
                        </TableCell>
                        <TableCell
                          sx={{ width: 300 }}
                          component="td"
                          scope="row"
                          align="center">
                          {usr.data.nickname}
                        </TableCell>
                        <TableCell component="td" scope="row" align="center">
                          {usr.data.moves}
                        </TableCell>
                        <TableCell component="td" scope="row" align="center">
                          {usr.data.time}
                        </TableCell>
                      </TableRow>
                    )
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="leaders__footer">
        <Pagination
          variant="outlined"
          shape="rounded"
          color="primary"
          count={
            leadersContext!.leaders
              ? Math.ceil(leadersContext!.leaders.length / rowsPerPage)
              : undefined
          }
          page={page}
          onChange={handleChangePage}
        />
      </div>
    </div>
  )
}
