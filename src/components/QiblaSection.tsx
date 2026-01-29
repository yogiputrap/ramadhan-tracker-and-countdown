"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function QiblaSection() {
  const [qiblaDirection, setQiblaDirection] = useState<number>(0);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [locationName, setLocationName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const compassRef = useRef<HTMLDivElement>(null);

  // Kaaba coordinates
  const KAABA_LAT = 21.4225;
  const KAABA_LON = 39.8262;

  // Calculate Qibla direction from user location
  const calculateQiblaDirection = (userLat: number, userLon: number): number => {
    const toRadians = (deg: number) => (deg * Math.PI) / 180;
    const toDegrees = (rad: number) => (rad * 180) / Math.PI;

    const lat1 = toRadians(userLat);
    const lon1 = toRadians(userLon);
    const lat2 = toRadians(KAABA_LAT);
    const lon2 = toRadians(KAABA_LON);

    const dLon = lon2 - lon1;

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    let bearing = toDegrees(Math.atan2(y, x));
    bearing = (bearing + 360) % 360;

    return bearing;
  };

  // Get user location
  useEffect(() => {
    const getLocation = async () => {
      setIsLoading(true);
      setError("");

      if (!("geolocation" in navigator)) {
        setError("Geolocation tidak didukung di browser Anda");
        setIsLoading(false);
        return;
      }

      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          });
        });

        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lon: longitude });

        // Calculate Qibla direction
        const qibla = calculateQiblaDirection(latitude, longitude);
        setQiblaDirection(qibla);

        // Get location name using reverse geocoding
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
          );
          const data = await response.json();
          const city = data.address?.city || data.address?.town || data.address?.village || "Lokasi Anda";
          setLocationName(city);
        } catch (err) {
          setLocationName("Lokasi Anda");
        }

        setIsLoading(false);
      } catch (err: any) {
        if (err.code === 1) {
          setError("Izin lokasi ditolak. Mohon aktifkan izin lokasi untuk menggunakan kompas kiblat.");
        } else if (err.code === 2) {
          setError("Lokasi tidak tersedia. Pastikan GPS Anda aktif.");
        } else if (err.code === 3) {
          setError("Timeout mendapatkan lokasi. Silakan coba lagi.");
        } else {
          setError("Gagal mendapatkan lokasi Anda.");
        }
        setIsLoading(false);
      }
    };

    getLocation();
  }, []);

  // Handle device orientation (compass)
  useEffect(() => {
    if (!userLocation) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      let heading = 0;

      if (event.alpha !== null) {
        if ((event as any).webkitCompassHeading !== undefined) {
          // iOS
          heading = (event as any).webkitCompassHeading;
        } else if (event.alpha !== null) {
          // Android
          heading = 360 - event.alpha;
        }
      }

      setDeviceHeading(heading);
    };

    // Request permission for iOS 13+
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
          } else {
            setError("Izin sensor orientasi ditolak. Mohon aktifkan di pengaturan browser.");
          }
        })
        .catch((err: any) => {
          console.error("Error requesting orientation permission:", err);
        });
    } else {
      // Non-iOS or older iOS
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [userLocation]);

  const requestPermissions = async () => {
    setIsLoading(true);
    setError("");
    
    // Request location permission
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lon: longitude });
      
      const qibla = calculateQiblaDirection(latitude, longitude);
      setQiblaDirection(qibla);

      // Request orientation permission for iOS
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState !== 'granted') {
          setError("Izin sensor orientasi diperlukan untuk kompas");
        }
      }

      setIsLoading(false);
    } catch (err) {
      setError("Gagal mendapatkan izin. Silakan coba lagi.");
      setIsLoading(false);
    }
  };

  // Calculate rotation for compass
  const compassRotation = qiblaDirection - deviceHeading;
  const distance = userLocation 
    ? Math.round(
        Math.acos(
          Math.sin(userLocation.lat * Math.PI / 180) * Math.sin(KAABA_LAT * Math.PI / 180) +
          Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(KAABA_LAT * Math.PI / 180) *
          Math.cos((userLocation.lon - KAABA_LON) * Math.PI / 180)
        ) * 6371
      )
    : 0;

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-16 pb-32">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            Arah Kiblat
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Gunakan kompas digital untuk menemukan arah kiblat dari lokasi Anda
          </p>
        </motion.div>

        {/* Main Compass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl p-6 md:p-10 shadow-card mb-6"
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-green mb-4"></div>
              <p className="text-gray-600">Mendapatkan lokasi Anda...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20">
              <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-red-600 text-center mb-4 max-w-md">{error}</p>
              <button
                onClick={requestPermissions}
                className="px-6 py-3 bg-primary-green text-white rounded-xl font-medium hover:bg-primary-green/90 transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          ) : (
            <>
              {/* Location Info */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-primary-green" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-lg font-semibold text-gray-900">{locationName}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {userLocation?.lat.toFixed(4)}°, {userLocation?.lon.toFixed(4)}°
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Jarak ke Makkah: ~{distance.toLocaleString()} km
                </p>
              </div>

              {/* Compass */}
              <div className="relative w-full max-w-sm mx-auto aspect-square">
                {/* Compass Background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner"></div>
                
                {/* Compass Rose */}
                <div
                  ref={compassRef}
                  className="absolute inset-4 rounded-full bg-white shadow-lg transition-transform duration-300 ease-out"
                  style={{ transform: `rotate(${-deviceHeading}deg)` }}
                >
                  {/* Cardinal directions */}
                  <div className="absolute inset-0">
                    {/* North */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2">
                      <span className="text-red-600 font-bold text-xl">U</span>
                    </div>
                    {/* East */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <span className="text-gray-600 font-bold text-lg">T</span>
                    </div>
                    {/* South */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                      <span className="text-gray-600 font-bold text-lg">S</span>
                    </div>
                    {/* West */}
                    <div className="absolute left-2 top-1/2 -translate-y-1/2">
                      <span className="text-gray-600 font-bold text-lg">B</span>
                    </div>
                  </div>

                  {/* Degree markers */}
                  {[...Array(36)].map((_, i) => {
                    const angle = i * 10;
                    const isCardinal = angle % 90 === 0;
                    return (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 origin-bottom"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${isCardinal ? '45%' : '47%'})`,
                          height: isCardinal ? '10%' : '6%',
                          width: isCardinal ? '3px' : '2px',
                          backgroundColor: isCardinal ? '#019147' : '#d1d5db'
                        }}
                      />
                    );
                  })}
                </div>

                {/* Qibla Needle */}
                <div
                  className="absolute top-1/2 left-1/2 transition-transform duration-300 ease-out"
                  style={{ 
                    transform: `translate(-50%, -50%) rotate(${compassRotation}deg)`,
                    width: '4px',
                    height: '40%',
                    transformOrigin: 'center center'
                  }}
                >
                  {/* Needle pointing to Qibla */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-full h-full flex flex-col items-center">
                    {/* Arrow head */}
                    <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-primary-green"></div>
                    {/* Needle body */}
                    <div className="w-1 flex-1 bg-primary-green shadow-lg"></div>
                  </div>
                </div>

                {/* Center circle with Kaaba icon */}
                <div className="absolute top-1/2 left-1/2 w-12 h-12 md:w-14 md:h-14 bg-primary-green rounded-full flex items-center justify-center shadow-lg z-10" style={{ transform: 'translate(-50%, -50%)' }}>
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L4 7v10c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7l-8-5zm0 2.18l6 3.75v7.32c0 4.35-2.98 8.44-6 9.75-3.02-1.31-6-5.4-6-9.75V7.93l6-3.75z"/>
                    <path d="M12 6L8 9v6c0 2.76 1.92 5.37 4 6 2.08-.63 4-3.24 4-6V9l-4-3z"/>
                  </svg>
                </div>
              </div>

              {/* Direction Info */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 mb-2">Arah Kiblat</p>
                <p className="text-4xl font-bold text-primary-green mb-1">
                  {Math.round(qiblaDirection)}°
                </p>
                <p className="text-xs text-gray-500">
                  Arahkan perangkat ke arah panah hijau
                </p>
              </div>
            </>
          )}
        </motion.div>

        {/* Instructions */}
        {!error && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-primary-green/5 to-accent-orange/5 rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Cara Menggunakan:</h3>
            <ol className="space-y-3 text-sm md:text-base text-gray-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-green text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Pastikan GPS dan sensor orientasi perangkat Anda aktif</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-green text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Pegang perangkat Anda secara horizontal (datar)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-green text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Putar perangkat hingga panah hijau menunjuk ke depan</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-green text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <span>Arah tersebut adalah arah kiblat dari lokasi Anda</span>
              </li>
            </ol>
          </motion.div>
        )}
      </div>
    </div>
  );
}
