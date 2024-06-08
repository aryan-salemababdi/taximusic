"use client"
import { useEffect, useRef, forwardRef } from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import "@neshan-maps-platform/react-openlayers/dist/style.css";
import MusicBar from "../MusicBar/MusicBar";
import { NeshanMapRef } from "@neshan-maps-platform/react-openlayers";

const NeshanMap = dynamic(() => import("@neshan-maps-platform/react-openlayers"), {
  ssr: false
});


// eslint-disable-next-line react/display-name
const Landing:NextPage = forwardRef((_props, ref) => {
  const mapRef = useRef<NeshanMapRef | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (mapRef.current?.map) {
        mapRef.current?.map.setMapType("standard-night");
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Box width="100%">
            <NeshanMap
              mapKey="web.210273a832c24bb1ba2386af18c742ff"
              defaultType="neshan"
              center={{ latitude: 35.7665394, longitude: 51.4749824 }}
              style={{ height: "50vh", width: "100%" }}
              zoom={13}
              traffic={true}
              ref={(instance) => {
                // Forward the ref to the inner NeshanMap component
                mapRef.current = instance;
                if (typeof ref === 'function') {
                  ref(instance);
                } else if (ref) {
                  ref.current = instance;
                }
              }}
            />
      </Box>
      <Box width="100%">
        <MusicBar />
      </Box>
    </>
  );
});

export default Landing;
