"use client"
import { Box, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import  SkipNextIcon  from '@mui/icons-material/SkipNext';
import  SkipPreviousIcon  from '@mui/icons-material/SkipPrevious';
import  PlayArrowIcon  from '@mui/icons-material/PlayArrow';

// images
import coverMuisc from "/src/assets/images/download.jpg";


const Suggestion = () => {

    const theme = useTheme();

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between">
                        <Box mx={0.15}>
                            <Typography component="div" variant="h5">
                                Moth to a flame
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                The Weeknd
                            </Typography>
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{ width: 80, borderRadius: "50%" }}
                            src={coverMuisc.src}
                            alt="Live from space album cover"
                        />
                    </Box>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous">
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    <IconButton aria-label="play/pause">
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                </Box>
            </Box>
        </>
    )
}

export default Suggestion;