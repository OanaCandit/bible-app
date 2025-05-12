import React, { useEffect, useRef, useState } from "react";
import BookSlider from "../BookSlider/BookSlider.jsx";
import { useFavoriteBooks } from "../../hooks/useFavoriteBooks";
import "./map.css";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import "@arcgis/core/assets/esri/themes/light/main.css";

const ArcGISMap = () => {
  const mapRef = useRef(null);
  const viewRef = useRef(null); // Use ref to persist the view
  const { favoriteBooks, addFavoriteBook } = useFavoriteBooks();

  useEffect(() => {
    if (mapRef.current && !viewRef.current) {
      console.log("Initializing map...");
      const webMap = new WebMap({
        portalItem: {
          id: "65e9fc26730d477ea2aaed6a84156b77",
        },
      });

      const view = new MapView({
        container: mapRef.current,
        map: webMap,
      });

      view
        .when(() => {
          console.log("Map and View are loaded");
          viewRef.current = view; // Persist the view
        })
        .catch((error) => {
          console.error("View initialization error:", error);
        });
    } else {
      console.log("Map reference is not set or view is already initialized.");
    }
  }, []);

  const handleBookClick = (bookId) => {
    if (!viewRef.current) {
      console.error("View not loaded");
      return;
    }

    viewRef.current
      .whenLayerView(
        viewRef.current.map.layers.find(
          (layer) => layer.id === "196b1b6fae0-layer-3"
        )
      )
      .then((layerView) => {
        if (!layerView) {
          console.error("Layer view not found");
          return;
        }

        layerView.filter = {
          where: `Verses LIKE '%${bookId}%'`,
        };

        console.log("Filter applied:", layerView.filter);
      })
      .catch((error) => {
        console.error("Layer view error:", error);
      });
  };

  return (
    <div className="map-container">
      <BookSlider
        onBookClick={handleBookClick}
        onAddFavorite={addFavoriteBook}
        favoriteBooks={favoriteBooks}
      />
      <div ref={mapRef} className="map-view" style={{ width: "100%" }}></div>
    </div>
  );
};

export default ArcGISMap;
