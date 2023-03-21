import { LinearProgress, styled } from '@mui/material';
import React from 'react';

// styles
const LoadWrapper = styled("div")({
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    width: "100%",
})

const Loader = () => {
    return (
        <LoadWrapper>
            <LinearProgress color='primary'/>
        </LoadWrapper>
    );
};

export default Loader;