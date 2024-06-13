import { useState, ChangeEvent } from 'react';
import { NextPage } from 'next';
import parse from 'id3-parser';
import {
    Box,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
    TextField
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';

interface SongInfo {
    title: string;
    artist: string;
    album: string;
    year: string;
    picture: string | null;
}

const UserPlayList: NextPage = () => {
    const theme = useTheme();
    const [files, setFiles] = useState<File[]>([]);
    const [songInfos, setSongInfos] = useState<SongInfo[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        if (selectedFile) {
            setFiles([...files, selectedFile]);
            await readFileInfo(selectedFile);
        }
    };

    const handleDeleteSong = (index: number) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);

        const updatedSongInfos = [...songInfos];
        updatedSongInfos.splice(index, 1);
        setSongInfos(updatedSongInfos);
    };

    const readFileInfo = async (file: File) => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            const tag = parse(uint8Array);

            if (tag) {
                const { title, artist, album, year, image } = tag;
                const picture = image ? `data:${image.mime};base64,${Buffer.from(image.data as number[]).toString('base64')}` : null;

                const newSongInfo: SongInfo = {
                    title: title || 'Unknown',
                    artist: artist || 'Unknown',
                    album: album || 'Unknown',
                    year: year || 'Unknown',
                    picture: picture || null,
                };

                setSongInfos([...songInfos, newSongInfo]);
            } else {
                alert('No ID3v2 tag found');
            }
        } catch (error) {
            console.error('Error reading file:', error);
            alert('Failed to read file');
        }
    };

    const filteredSongInfos = songInfos.filter(songInfo =>
        songInfo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        songInfo.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        songInfo.album.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Box display="flex" justifyContent="center" my={2}>
                <input type="file" accept="audio/*" onChange={handleFileChange} />
            </Box>
            <Box display="flex" justifyContent="center" my={2}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                />
            </Box>
            {filteredSongInfos.map((songInfo, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent>
                        <Box display="flex" justifyContent="space-between">
                            <CardMedia
                                component="img"
                                sx={{ width: 80, height: 80, borderRadius: "50%" }}
                                src={songInfo.picture || ""}
                                alt={songInfo.album}
                            />
                            <Box mx={1}>
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
                            <IconButton sx={{ height: "fit-content" }} aria-label="delete" onClick={() => handleDeleteSong(index)}>
                                <DeleteIcon />
                            </IconButton>
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
            ))}
        </>
    );
};


export default UserPlayList;
