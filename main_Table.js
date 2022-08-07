import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useNavigate } from 'react-router-dom';

function Main_Table(item) {
    const navigate = useNavigate();

    let posts = item.item
    console.log(posts);
    // 테이블 style
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#15235B',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        }
    }));

    // 게시글 하나 클릭
    const myFunction = (item) => {
        navigate('../detail', {
            state:
            {
                index: item.IDX,
                titles: item.TITLES,
                cont: item.CONT,
                writer: item.WRITER,
                like: item.LIKES,
                inputTime: item.INPUTTIME
            }
        })
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table" id="table_id">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>번호</StyledTableCell>
                        <StyledTableCell align="right" width='100px'>제목</StyledTableCell>
                        <StyledTableCell align="right" width='160px'>글쓴이</StyledTableCell>
                        <StyledTableCell align="right" width='160px'>추천</StyledTableCell>
                        <StyledTableCell align="right" >작성일</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.map((item) => (
                        <StyledTableRow key={item.IDX} onClick={() => myFunction(item)}>
                            <StyledTableCell component="th" scope="row">{item.IDX}</StyledTableCell>
                            <StyledTableCell align="right">{item.TITLES}</StyledTableCell>
                            <StyledTableCell align="right">{item.WRITER}</StyledTableCell>
                            <StyledTableCell align="right">{item.LIKES}</StyledTableCell>
                            <StyledTableCell align="right">{item.INPUTTIME}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default Main_Table;