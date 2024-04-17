import React from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const MainPagination = (props) => {
    const { totalPages, page, size, setPage } = props;
    return (
        <Stack spacing={2} 
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: '5px 0 10px 0',
                color:"secondary"
            }}
        >
            <Pagination
                
                color="secondary"
                count={totalPages}
                page={page}
                size={size}
                onChange={(e, page) => setPage(page)}
                
               
            />
        </Stack>
    )
}

export default MainPagination;