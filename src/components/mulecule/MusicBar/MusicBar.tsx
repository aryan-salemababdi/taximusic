import Music from '@/components/Atom/Music/Music';
import { Typography } from '@mui/material';

const MusicBar = () => {



    return (
        <>
            <Typography 
            fontWeight="bold" 
            variant="h5" 
            textAlign="center"
            sx={{my:"20px"}}
            >
                Welcome to the Taxi<span style={{color:"red"}}>M</span>usic
            </Typography>
            <Music />
        </>
    )
}

export default MusicBar;