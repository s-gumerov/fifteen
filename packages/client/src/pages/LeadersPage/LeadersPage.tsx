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
import {TPlayer} from "./types";
import {useLeaders} from "../../context/Leaders";

export const LeadersPage = (): JSX.Element => {
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const leadersContext = useLeaders()
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
                                leadersContext!.leaders.sort((a: TPlayer, b: TPlayer) => a.moves - b.moves).slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                                    .map((usr: TPlayer, index: number) => {
                                        return (
                                            <TableRow className={usr.nickname === "Ты" ? "userCell" : ""} key={index}>
                                                <TableCell sx={{width: 70}} component="td" scope="row"
                                                           align="center">
                                                    {leadersContext!.leaders.indexOf(usr) + 1}
                                                </TableCell>
                                                <TableCell sx={{width: 300}} component="td" scope="row"
                                                           align="center">
                                                    {usr.nickname}
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
                    count={Math.ceil(leadersContext!.leaders.length / rowsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                />
            </div>
        </div>
    )
}

