import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
// Package för att definera kartan.
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";


import { useGeolocated } from "react-geolocated";

const containerStyle = {
  width: "500px",
  height: "500px",
};

//innehåller object för att rita markör för kartan
const svgMarker = {
  path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
  fillColor: "blue",
  fillOpacity: 0.6,
  strokeWeight: 0,
  rotation: 0,
  scale: 2,
};

const divStyle = {
  background: `white`,
  height: "0.8rem",
};

function Map() {
  // Om kartan laddar eller inte boolisk värde
  const [loading, setLoading] = useState(true);
  //koordinater för att centrera kartan
  const [center, setCenter] = useState(null);
  //Instansen av google maps
  const [map, setMap] = useState(null);
  //en array av butiker vi hämtar från google api
  const [stores, setStores] = useState([]);

  // infobox states

  //Valda butiken när användaren klickar på en markör
  const [selectedPlace, setSelectedPlace] = useState(null);
  //mappa place_id till markören ovanför
  const [markerMap, setMarkerMap] = useState({});

  //Om InfoWindow är open elelr inte
  const [infoOpen, setInfoOpen] = useState(false);

  //lägga till state för butikens information
  const [selectedStoreDetails, setSelectedStoreDetails] = useState(null);

  //hämta google map API
  //Key döljer vi i en .env fil
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAP_API,
  });

  //hämta användarens geolocation

  //coords : Ett objekt som innehåller koordinaterna för användarens geografiska position (latitude och longitude).
  //isGelocationAvailable :En boolean som indikerar om webbläsaren stöder geolokalisering API (true) eller inte (false)
  //IsGeolocationEnabled : En boolean som indikerar om användaren har gett tillåtelse att använda geolokalisering (true) eller inte (false)
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  //
  useEffect(() => {
    if (coords && coords.latitude) {
      setCenter({ lat: coords.latitude, lng: coords.longitude });

      setLoading(false);
    }
  }, [coords]);

  //hook som returnerar en memoriserad funktion
  //funktionen endast skapas vid ändring
  //
  const onLoad = useCallback(
    function callback(map) {
      //Kopierad från googlemap package
      //
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      var location = new google.maps.LatLng(center.lat, center.lng);
      //requst för användarens position, sökradie, sökord från api och sökord vid sökning
      const request = {
        location: location,
        radius: "5000",
        type: ["supermarket"],
        keyword: "supermarket",
      };
      //skapa en instans ac places
      const service = new google.maps.places.PlacesService(map);
      //
      service.nearbySearch(request, function (results, status) {
        if (status !== "OK") {
          return console.log("WRONG");
        }
        setStores(results);
      });
      //uppdatera map
      setMap(map);
    },
    [loading]
  );

  //useCallback hook som körs när googlemaps komponenten avlägsnas eller avmonteras och rensar instansen och sätter värdet null.
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  // We have to create a mapping of our places to actual Marker objects

  //Tar in en markör och en plats och lägger till markören i en datastruktur med en unik nyckel baserad på places_id
  const markerLoadHandler = (marker, place) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [place.place_id]: marker };
    });
  };

  const markerClickHandler = (event, place) => {
    console.log("klicka på en plats", place);

    const request = {
      placeId: place.place_id,
      fields: ["name", "vicinity", "opening_hours", "url"],
    };

    const service = new google.maps.places.PlacesService(map);

    //hämta detailjerad information
    service.getDetails(request, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setSelectedStoreDetails(result);
      }
    });

    setSelectedPlace(place);

    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);
  };
  
  return !loading && isLoaded && isGeolocationEnabled ? (
    <>
      <div className="my-4">
        <Container>
          <Row className="justify-content-center">
            <Col md={12} lg={8}>
              <h1 className="home-screen-titles"> Nearby stores</h1>
              <div style={{ height: "500px", position: "relative" }}>
                <GoogleMap
                  mapContainerStyle={{ height: "100%", width: "100%" }}
                  center={center}
                  zoom={11}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  <Marker position={center} icon={svgMarker}>
                    <InfoWindow>
                      <div style={divStyle}>
                        <h2 style={{ fontSize: 11 }}>Din position</h2>
                      </div>
                    </InfoWindow>
                  </Marker>

                  {stores.map((store) => {
                    return (
                      <Marker
                        key={store.place_id}
                        position={store.geometry.location}
                        title={store.name}
                        onLoad={(marker) => markerLoadHandler(marker, store)}
                        onClick={(event) => {
                          setInfoOpen(false);
                          markerClickHandler(event, store);
                        }}
                      ></Marker>
                    );
                  })}

                  {infoOpen && selectedPlace && selectedStoreDetails && (
                    <InfoWindow
                      anchor={markerMap[selectedPlace.place_id]}
                      onCloseClick={() => {
                        setInfoOpen(false);
                        setSelectedStoreDetails(null);
                      }}
                    >
                      <div>
                        <h3>{selectedStoreDetails.name}</h3>
                        <div>{selectedStoreDetails.vicinity}</div>
                        {selectedStoreDetails.opening_hours && (
                          <div>
                            <strong>Opening hours:</strong>
                            <ul>
                              {selectedStoreDetails.opening_hours.weekday_text.map(
                                (hours) => (
                                  <li key={hours}>{hours}</li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                        <a
                          href={selectedStoreDetails.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on Google Maps
                        </a>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  ) : (
    <></>
  );
}

export default Map;
