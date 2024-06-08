import { useState, ChangeEvent } from 'react';
import { NextPage } from 'next';
import parse from 'id3-parser';
import { Box, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface SongInfo {
    title: string;
    artist: string;
    album: string;
    year: string;
    picture: string | null;
}

const UserPlayList: NextPage = () => {
    const theme = useTheme();
    const [file, setFile] = useState<File | null>(null);
    const [songInfo, setSongInfo] = useState<SongInfo | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
        if (selectedFile) {
            readFileInfo(selectedFile);
        }
    };

    const readFileInfo = async (file: File) => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            const tag = parse(uint8Array);

            if (tag) {
                const { title, artist, album, year, image } = tag;
                const picture = image ? `data:${image.mime};base64,${Buffer.from(image.data as number[]).toString('base64')}` : null;



                setSongInfo({
                    title: title || 'Unknown',
                    artist: artist || 'Unknown',
                    album: album || 'Unknown',
                    year: year || 'Unknown',
                    picture: picture || null,
                });
            } else {
                alert('No ID3v2 tag found');
            }
        } catch (error) {
            console.error('Error reading file:', error);
            alert('Failed to read file');
        }
    };


    return (
        <>
            <Box display="flex" justifyContent="center" ml={9} my={2}>
                <input type="file" accept="audio/*" onChange={handleFileChange} />
            </Box>
            {songInfo && (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent>
                        <Box display="flex" justifyContent="space-between">
                            <CardMedia
                                component="img"
                                sx={{ width: 80, height: 80, borderRadius: "50%" }}
                                src={songInfo.picture || ""}
                                alt={songInfo.album}
                            />
                            <Box mx={0.15}>
                                <Typography component="div" variant="h5">
                                    {songInfo.title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {songInfo.artist}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {songInfo.year}
                                </Typography>
                            </Box>
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
            )}
        </>
    );
};

export default UserPlayList;

// <div>
//   <h3>Song Information</h3>
//   <p>Title: {songInfo.title}</p>
//   <p>Artist: {songInfo.artist}</p>
//   <p>Album: {songInfo.album}</p>
//   <p>Year: {songInfo.year}</p>
//   {songInfo.picture && <Image src={songInfo.picture} alt="Album Art" width={100} height={100}/>}
// </div>