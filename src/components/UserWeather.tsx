import React, { useEffect } from "react";

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => console.log(position),
      () => console.log("User denied to give location")
    );
  }
}

export default function UserWeather() {
    useEffect(() => {
        getUserLocation()
    }, [])
    
  return <div></div>;
}
