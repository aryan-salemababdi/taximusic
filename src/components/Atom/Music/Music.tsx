"use client"
import { useState } from 'react';
import { Box, Button, Card, Typography } from '@mui/material';
import Suggestion from '../Suggestion/Suggestion';
import UserPlayList from '../UserPlayList/UserPlayList';



const Music = () => {

  const [select, setSelect] = useState<"suggestion" | "userPlayList" | null>(null);

  const selectHandller = (select: "suggestion" | "userPlayList" | null): void => {
    setSelect(select);
  };

  return (
    <>
      <Box display="flex" justifyContent="center" m={2}>
        <Card
          sx={{
            height: "fit-content",
            width: "300px",
            maxWidth: "300px"
          }}
        >
          <Box display="flex" justifyContent="space-evenly" p={1}>
            <Button variant="contained" color="error" onClick={() => selectHandller("suggestion")}>
              <Typography fontWeight="bold" >
                پیشنهادی ها
              </Typography>
            </Button>
            <Button onClick={() => selectHandller("userPlayList")} color="inherit">
              <Typography fontWeight="bold" >
                پلی لیست شما
              </Typography>
            </Button>
          </Box>
          {
            select === "suggestion" ?
              (
                <Suggestion />
              )
              : select === "userPlayList" ?
                (
                  <UserPlayList />
                )
                :
                (
                  <Typography textAlign="center" fontWeight="bold">
                    لطفا یک آیتم را انتخاب کنید
                  </Typography>
                )
          }
        </Card>
      </Box>
    </>
  )
}

export default Music;