"use client";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpotifyData } from "@/stores/slices/albumsSlice/albumsSlice";
import { Box, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

// images
import coverMuisc from "/src/assets/images/download.jpg";

const Suggestion = () => {
    const theme = useTheme();

    const dispatch = useDispatch();
    const { data, status, error } = useSelector((state: any) => state.spotify);

    const [currentTrack, setCurrentTrack] = useState<string | undefined>(undefined);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchSpotifyData());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrack]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    if (!data || !data.result || !data.result.albums) {
        return <div>No data available</div>;
    }

    const { items } = data.result.albums;

    const handlePlayPause = (previewUrl: string) => {
        if (currentTrack === previewUrl) {
            setIsPlaying(!isPlaying);
        } else {
            setCurrentTrack(previewUrl);
            setIsPlaying(true);
        }
    };

    return (
        <>
            {items.map((item: any) => (
                <Box key={item.id} sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                    <CardContent>
                        <Box display="flex" justifyContent="space-between">
                            <Box mx={0.15}>
                                <Typography component="div" variant="h5">
                                    {item.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {item.artists.map((artist: any) => artist.name).join(', ')}
                                </Typography>
                            </Box>
                            <CardMedia
                                component="img"
                                sx={{ width: 80, borderRadius: "50%" }}
                                src={item.images[0]?.url || coverMuisc.src}
                                alt={item.name}
                            />
                        </Box>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", pl: 1, pb: 1 }}>
                        <IconButton aria-label="previous">
                            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                        </IconButton>
                        <IconButton aria-label="play/pause" onClick={() => handlePlayPause(item.preview_url)}>
                            {currentTrack === item.preview_url && isPlaying ? (
                                <PauseIcon sx={{ height: 38, width: 38 }} />
                            ) : (
                                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                            )}
                        </IconButton>
                        <IconButton aria-label="next">
                            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                        </IconButton>
                    </Box>
                </Box>
            ))}
            <audio ref={audioRef} src={currentTrack ?? undefined} />
        </>
    );
}

export default Suggestion;
