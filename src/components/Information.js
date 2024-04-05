import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

export default function InfoComponent ({ input, information }) {
    const [isHovered, setIsHovered] = useState(false);

    const onHover = () => {
        setIsHovered(true);
    };

    const onLeave = () => {
        setIsHovered(false);
    };

    return (
        <Box onMouseOver={onHover} onMouseLeave={onLeave}>
            <Typography>{input}</Typography>
        </Box>
    );
};
