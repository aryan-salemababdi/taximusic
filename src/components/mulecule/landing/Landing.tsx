"use client"
import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import "@neshan-maps-platform/react-openlayers/dist/style.css"

import NeshanMap, { NeshanMapRef } from "@neshan-maps-platform/react-openlayers"
import MusicBar from "../MusicBar/MusicBar"

function Landing() {
  const mapRef = useRef<NeshanMapRef | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (mapRef.current?.map) {
        mapRef.current?.map.setMapType("standard-night")
        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <NeshanMap
        mapKey="web.210273a832c24bb1ba2386af18c742ff"
        defaultType="neshan"
        center={{ latitude: 35.7665394, longitude: 51.4749824 }}
        style={{ height: "50vh", width: "100%" }}
        zoom={13}
        traffic={true}
      ></NeshanMap>
      <hr />
      <Box width="100%">
      <MusicBar />
      </Box>
    </>
  )
}

export default Landing;