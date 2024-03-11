import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NftData, yoportLink } from './types';

type NftTableProps = {
    data: NftData[];
};

const NftTable: React.FC<NftTableProps> = ({ data }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell className="narrow-on-mobile" align="left">Collection</TableCell>
                        <TableCell align="right">Minted</TableCell>
                        <TableCell className="hide-on-mobile" align="right">Price (ETH)</TableCell>
                        <TableCell className="hide-on-mobile" align="right">Contract</TableCell>
                        <TableCell className="hide-on-mobile" align="right">Developer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <img className="nft-image" src={`/images/${row.nftimage}`} alt={row.nftimage} style={{ width: '100px', height: '100px' }} />
                            </TableCell>
                            <TableCell className="japanese-cell" align="left">
                            <a href={`${yoportLink}${row.slug}`} target="_blank" rel="noopener noreferrer" style={{ color: 'yellow' }}>

                                {row.name}
                                </a>

                            </TableCell>
                            <TableCell align="right">{row.minted} ({row.supply})</TableCell>
                            <TableCell className="hide-on-mobile" align="right">{row.price}</TableCell>
                            <TableCell className="hide-on-mobile" align="right">
                                <a href={`https://astar-zkevm.explorer.startale.com/address/${row.contract}`} target="_blank" rel="noopener noreferrer" style={{ color: 'yellow' }}>
                                    {row.contract.substring(0, 6)}...
                                </a>
                            </TableCell>
                            <TableCell className="hide-on-mobile" align="right">{row.team}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default NftTable;