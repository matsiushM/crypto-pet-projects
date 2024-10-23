import {Route, Routes} from "react-router-dom";
import {Box} from "@mui/material";

import {HomePage} from "pages/main";

export const Routing = () => {
    return (
        <Box
        sx={{
            height: '90%',
            width: '100%',
            backgroundColor: 'primary.main',
        }}>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </Box>
    )
}