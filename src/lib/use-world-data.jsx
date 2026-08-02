"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { feature } from "topojson-client";

const WORLD_DATA_URL =
  "https://raw.githubusercontent.com/subyfly/topojson/refs/heads/master/world-countries.json";

// Global cache to avoid refetching across component mounts
let globalWorldDataCache = null;
let globalFetchPromise = null;

function fetchWorldData() {
  // Return cached data if available
  if (globalWorldDataCache) {
    return Promise.resolve(globalWorldDataCache);
  }

  // Return existing promise if fetch is in progress
  if (globalFetchPromise) {
    return globalFetchPromise;
  }

  // Start new fetch
  globalFetchPromise = (async () => {
    try {
      const response = await fetch(WORLD_DATA_URL);
      const topology = (await response.json());
      const objectKey = Object.keys(topology.objects)[0];
      if (!objectKey) {
        throw new Error("No objects found in topology");
      }
      const geoObject = topology.objects[objectKey];
      if (!geoObject) {
        throw new Error("Object not found in topology");
      }
      const geojson = feature(topology, geoObject);
      globalWorldDataCache = geojson;
      return geojson;
    } catch (error) {
      console.error("Failed to fetch world data:", error);
      return null;
    }
  })();

  return globalFetchPromise;
}

const WorldDataContext = createContext({
  worldData: null,
  isLoading: true,
});

export function WorldDataProvider({
  children
}) {
  const [worldData, setWorldData] = useState(globalWorldDataCache);
  const [isLoading, setIsLoading] = useState(!globalWorldDataCache);

  useEffect(() => {
    if (globalWorldDataCache) {
      setWorldData(globalWorldDataCache);
      setIsLoading(false);
      return;
    }

    fetchWorldData().then((data) => {
      setWorldData(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <WorldDataContext.Provider value={{ worldData, isLoading }}>
      {children}
    </WorldDataContext.Provider>
  );
}

export function useWorldData() {
  return useContext(WorldDataContext);
}

// Standalone hook for components that don't have the provider
export function useWorldDataStandalone() {
  const [worldData, setWorldData] = useState(globalWorldDataCache);
  const [isLoading, setIsLoading] = useState(!globalWorldDataCache);

  useEffect(() => {
    if (globalWorldDataCache) {
      setWorldData(globalWorldDataCache);
      setIsLoading(false);
      return;
    }

    fetchWorldData().then((data) => {
      setWorldData(data);
      setIsLoading(false);
    });
  }, []);

  return { worldData, isLoading };
}
