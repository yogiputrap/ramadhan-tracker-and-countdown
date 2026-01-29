"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PrayerTime {
  name: string;
  time: string;
  icon: JSX.Element;
}

interface PrayerTimesAPI {
  tanggal: string;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

interface TodoItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: "preparation" | "daily" | "special";
}

export default function TrackerSection() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [isLoadingPrayer, setIsLoadingPrayer] = useState(true);
  const [locationName, setLocationName] = useState("Jakarta");
  const [cityId, setCityId] = useState("1301"); // Default Jakarta
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "daily" as "preparation" | "daily" | "special"
  });
  const [todos, setTodos] = useState<TodoItem[]>([]);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('ramadhan-todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Error loading todos from localStorage:', error);
        // Set default todos if parsing fails
        setDefaultTodos();
      }
    } else {
      // Set default todos if nothing in localStorage
      setDefaultTodos();
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('ramadhan-todos', JSON.stringify(todos));
    }
  }, [todos]);

  const setDefaultTodos = () => {
    const defaultTodos: TodoItem[] = [
      {
        id: "1",
        title: "Takjil Shopping",
        description: "Belanja bahan untuk takjil minggu ini",
        completed: false,
        category: "preparation"
      },
      {
        id: "2",
        title: "Sharing Takjil at Masjid Agung",
        description: "Berbagi takjil di masjid untuk jamaah",
        completed: false,
        category: "daily"
      },
      {
        id: "3",
        title: "Tahajjud Preparation",
        description: "Persiapan bangun untuk sholat tahajjud",
        completed: false,
        category: "daily"
      },
      {
        id: "4",
        title: "Tilawah Al-Quran",
        description: "Membaca 1 juz Al-Quran hari ini",
        completed: false,
        category: "daily"
      },
      {
        id: "5",
        title: "Sedekah Jumat",
        description: "Menyisihkan sedekah untuk hari Jumat",
        completed: false,
        category: "special"
      },
      {
        id: "6",
        title: "Kajian Ramadhan",
        description: "Menghadiri kajian malam di masjid",
        completed: false,
        category: "special"
      }
    ];
    setTodos(defaultTodos);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Haversine formula for accurate distance calculation
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Get user location and find nearest city
  useEffect(() => {
    const getUserLocation = async () => {
      // Check if user has saved location preference
      const savedCityId = localStorage.getItem('prayer-city-id');
      const savedCityName = localStorage.getItem('prayer-city-name');
      
      if (savedCityId && savedCityName) {
        setCityId(savedCityId);
        setLocationName(savedCityName);
        return;
      }

      if ("geolocation" in navigator) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0
            });
          });

          const { latitude, longitude } = position.coords;
          
          // Major Indonesian cities with accurate coordinates
          const cityCoords: { [key: string]: { lat: number; lon: number; id: string } } = {
            "Bandung": { lat: -6.9175, lon: 107.6191, id: "1204" },
            "Jakarta": { lat: -6.2088, lon: 106.8456, id: "1301" },
            "Surabaya": { lat: -7.2575, lon: 112.7521, id: "1403" },
            "Medan": { lat: 3.5952, lon: 98.6722, id: "0219" },
            "Semarang": { lat: -6.9667, lon: 110.4167, id: "1308" },
            "Makassar": { lat: -5.1477, lon: 119.4327, id: "1671" },
            "Palembang": { lat: -2.9761, lon: 104.7754, id: "1601" },
            "Tangerang": { lat: -6.1783, lon: 106.6319, id: "1371" },
            "Depok": { lat: -6.4025, lon: 106.7942, id: "1277" },
            "Bekasi": { lat: -6.2349, lon: 106.9896, id: "1275" },
            "Bogor": { lat: -6.5950, lon: 106.7887, id: "1209" },
            "Yogyakarta": { lat: -7.7956, lon: 110.3695, id: "1401" },
            "Malang": { lat: -7.9797, lon: 112.6304, id: "1318" },
            "Denpasar": { lat: -8.6705, lon: 115.2126, id: "1701" },
            "Balikpapan": { lat: -1.2379, lon: 116.8529, id: "1601" }
          };
          
          // First, try to get city name from reverse geocoding
          try {
            const geoResponse = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
            );
            const geoData = await geoResponse.json();
            const detectedCity = geoData.address?.city || geoData.address?.town || geoData.address?.village || "";
            
            // Check if detected city matches our supported cities
            for (const [cityName, coords] of Object.entries(cityCoords)) {
              if (detectedCity.toLowerCase().includes(cityName.toLowerCase()) || 
                  cityName.toLowerCase().includes(detectedCity.toLowerCase())) {
                setCityId(coords.id);
                setLocationName(cityName);
                localStorage.setItem('prayer-city-id', coords.id);
                localStorage.setItem('prayer-city-name', cityName);
                return;
              }
            }
          } catch (geoError) {
            console.log("Reverse geocoding failed, using distance calculation");
          }
          
          // Fallback: Find nearest city using Haversine formula
          let nearestCity = { id: "1301", nama: "Jakarta" };
          let minDistance = Infinity;
          
          for (const [cityName, coords] of Object.entries(cityCoords)) {
            const distance = calculateDistance(latitude, longitude, coords.lat, coords.lon);
            
            if (distance < minDistance) {
              minDistance = distance;
              nearestCity = { id: coords.id, nama: cityName };
            }
          }
          
          setCityId(nearestCity.id);
          setLocationName(nearestCity.nama);
          localStorage.setItem('prayer-city-id', nearestCity.id);
          localStorage.setItem('prayer-city-name', nearestCity.nama);
          
        } catch (error) {
          console.log("Geolocation denied or error, using default Jakarta:", error);
          setCityId("1301");
          setLocationName("Jakarta");
        }
      } else {
        console.log("Geolocation not available, using default Jakarta");
        setCityId("1301");
        setLocationName("Jakarta");
      }
    };

    getUserLocation();
  }, []);

  // Fetch prayer times from API
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      if (!cityId) return; // Wait for cityId to be set
      
      setIsLoadingPrayer(true);
      try {
        // Get Jakarta time
        const jakartaDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
        const year = jakartaDate.getFullYear();
        const month = String(jakartaDate.getMonth() + 1).padStart(2, '0');
        const day = String(jakartaDate.getDate()).padStart(2, '0');
        
        // API endpoint with dynamic city ID
        const response = await fetch(`https://api.myquran.com/v2/sholat/jadwal/${cityId}/${year}/${month}/${day}`);
        const data = await response.json();
        
        if (data.status && data.data && data.data.jadwal) {
          const jadwal = data.data.jadwal;
          const lokasi = data.data.lokasi || "Jakarta";
          
          setLocationName(lokasi);
          
          const times: PrayerTime[] = [
            {
              name: "Subuh",
              time: jadwal.subuh || "04:30",
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              )
            },
            {
              name: "Dzuhur",
              time: jadwal.dzuhur || "12:05",
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              )
            },
            {
              name: "Ashar",
              time: jadwal.ashar || "15:15",
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              )
            },
            {
              name: "Maghrib",
              time: jadwal.maghrib || "18:10",
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )
            },
            {
              name: "Isya",
              time: jadwal.isya || "19:20",
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )
            }
          ];
          
          setPrayerTimes(times);
        }
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        // Fallback to default times if API fails
        setPrayerTimes([
          {
            name: "Subuh",
            time: "04:30",
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            )
          },
          {
            name: "Dzuhur",
            time: "12:05",
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            )
          },
          {
            name: "Ashar",
            time: "15:15",
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            )
          },
          {
            name: "Maghrib",
            time: "18:10",
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )
          },
          {
            name: "Isya",
            time: "19:20",
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )
          }
        ]);
      } finally {
        setIsLoadingPrayer(false);
      }
    };

    fetchPrayerTimes();
  }, [cityId]); // Re-fetch when cityId changes

  // Get Jakarta time
  const jakartaDate = new Date(currentDate.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));

  // Calendar generation
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  
  const year = jakartaDate.getFullYear();
  const month = jakartaDate.getMonth();
  const today = jakartaDate.getDate();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();
  
  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const openAddModal = () => {
    setFormData({
      title: "",
      description: "",
      category: "daily"
    });
    setEditingTodo(null);
    setShowAddModal(true);
  };

  const openEditModal = (todo: TodoItem) => {
    setFormData({
      title: todo.title,
      description: todo.description,
      category: todo.category
    });
    setEditingTodo(todo);
    setShowAddModal(true);
    setOpenMenuId(null);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingTodo(null);
    setFormData({
      title: "",
      description: "",
      category: "daily"
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    if (editingTodo) {
      // Edit existing todo
      setTodos(todos.map(todo =>
        todo.id === editingTodo.id
          ? { ...todo, ...formData }
          : todo
      ));
    } else {
      // Add new todo
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        ...formData,
        completed: false
      };
      setTodos([...todos, newTodo]);
    }
    
    closeModal();
  };

  const deleteTodo = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus aktivitas ini?")) {
      setTodos(todos.filter(todo => todo.id !== id));
      setOpenMenuId(null);
    }
  };

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const completedCount = todos.filter(t => t.completed).length;
  const progressPercentage = (completedCount / todos.length) * 100;

  // Function to manually change city
  const changeCity = (newCityId: string, newCityName: string) => {
    setCityId(newCityId);
    setLocationName(newCityName);
    localStorage.setItem('prayer-city-id', newCityId);
    localStorage.setItem('prayer-city-name', newCityName);
    setShowCityModal(false);
    setIsLoadingPrayer(true);
  };

  // Available cities
  const availableCities = [
    { id: "1204", name: "Bandung" },
    { id: "1301", name: "Jakarta" },
    { id: "1403", name: "Surabaya" },
    { id: "0219", name: "Medan" },
    { id: "1308", name: "Semarang" },
    { id: "1671", name: "Makassar" },
    { id: "1601", name: "Palembang" },
    { id: "1371", name: "Tangerang" },
    { id: "1277", name: "Depok" },
    { id: "1275", name: "Bekasi" },
    { id: "1209", name: "Bogor" },
    { id: "1401", name: "Yogyakarta" },
    { id: "1318", name: "Malang" },
    { id: "1701", name: "Denpasar" },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-16 pb-32">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-6 md:mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Tracker Ibadah
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Pantau jadwal sholat dan aktivitas Ramadhan Anda
          </p>
        </motion.div>

        {/* Prayer Times Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="bg-gradient-to-br from-primary-green to-primary-green/90 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-card text-white"
        >
          <div className="flex items-center justify-between mb-5 md:mb-6">
            <h2 className="text-lg md:text-2xl font-bold">Jadwal Sholat</h2>
            <div className="text-right">
              <button
                onClick={() => setShowCityModal(true)}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 group"
                title="Klik untuk ubah lokasi"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-left">
                  <p className="text-xs md:text-sm font-semibold opacity-90 flex items-center gap-1">
                    {locationName}
                    <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </p>
                  <p className="text-[10px] md:text-xs opacity-75">{jakartaDate.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </button>
            </div>
          </div>
          
          {isLoadingPrayer ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5 md:gap-4">
            {prayerTimes.map((prayer, index) => (
              <div
                key={prayer.name}
                className={`bg-white/10 backdrop-blur-sm rounded-xl p-3.5 md:p-5 hover:bg-white/20 transition-colors duration-200 ${
                  index === 4 ? 'col-span-2 md:col-span-1' : ''
                }`}
                style={{ 
                  animation: `fadeIn 0.3s ease-out ${0.1 + index * 0.03}s both`
                }}
              >
                <div className="flex items-center gap-3 md:flex-col md:text-center md:gap-2">
                  <div className="flex-shrink-0">
                    {prayer.icon}
                  </div>
                  <div className="flex-1 md:flex-none">
                    <p className="text-xs md:text-sm font-medium mb-0.5 md:mb-1 opacity-90">{prayer.name}</p>
                    <p className="text-xl md:text-2xl font-bold">{prayer.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Calendar Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-card"
          >
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
              Kalender {monthNames[month]} {year}
            </h3>
            
            <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
              {dayNames.map((day, i) => (
                <div key={i} className="text-center text-gray-500 text-xs font-medium py-1">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  onClick={() => day && setSelectedDate(new Date(year, month, day))}
                  className={`text-center py-2 md:py-3 rounded-lg text-xs md:text-sm transition-all duration-200 ${
                    day === today
                      ? "bg-primary-green text-white font-bold shadow-md"
                      : day === null
                      ? "text-transparent cursor-default"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {day || "-"}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Progress Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-card"
          >
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
              Progress Hari Ini
            </h3>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Aktivitas Selesai</span>
                <span className="text-sm font-bold text-primary-green">{completedCount}/{todos.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary-green to-accent-orange h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-primary-green/5 rounded-xl">
                <div className="text-2xl">🎯</div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Target Harian</p>
                  <p className="text-sm font-semibold text-gray-900">6 Aktivitas</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-accent-orange/5 rounded-xl">
                <div className="text-2xl">⭐</div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Streak</p>
                  <p className="text-sm font-semibold text-gray-900">7 Hari Berturut-turut</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Todo List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              Aktivitas Ramadhan
            </h3>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2 bg-primary-green text-white rounded-xl font-medium hover:bg-primary-green/90 transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Tambah</span>
            </button>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            {todos.map((todo, index) => (
              <div
                key={todo.id}
                className={`relative flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-xl border-2 transition-colors duration-200 ${
                  todo.completed
                    ? "bg-primary-green/5 border-primary-green/20"
                    : "bg-gray-50 border-gray-200 hover:border-primary-green/30"
                }`}
                style={{ 
                  animation: `fadeIn 0.3s ease-out ${0.1 + index * 0.02}s both`
                }}
              >
                <div 
                  className="flex-shrink-0 mt-0.5 cursor-pointer"
                  onClick={() => toggleTodo(todo.id)}
                >
                  <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    todo.completed
                      ? "bg-primary-green border-primary-green"
                      : "border-gray-300 hover:border-primary-green"
                  }`}>
                    {todo.completed && (
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className={`text-sm md:text-base font-semibold ${
                      todo.completed ? "text-gray-500 line-through" : "text-gray-900"
                    }`}>
                      {todo.title}
                    </h4>
                  </div>
                  <p className={`text-xs md:text-sm mb-2 ${
                    todo.completed ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {todo.description}
                  </p>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    todo.category === "preparation"
                      ? "bg-blue-100 text-blue-700"
                      : todo.category === "daily"
                      ? "bg-green-100 text-green-700"
                      : "bg-purple-100 text-purple-700"
                  }`}>
                    {todo.category === "preparation" ? "Persiapan" : todo.category === "daily" ? "Harian" : "Spesial"}
                  </span>
                </div>

                {/* Three-dot menu */}
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => toggleMenu(todo.id)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                    title="Menu"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  {openMenuId === todo.id && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setOpenMenuId(null)}
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute right-0 top-10 z-20 w-40 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                      >
                        <button
                          onClick={() => openEditModal(todo)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                        >
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Hapus</span>
                        </button>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {todos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Belum ada aktivitas</p>
              <button
                onClick={openAddModal}
                className="text-primary-green font-medium hover:underline"
              >
                Tambah aktivitas pertama Anda
              </button>
            </div>
          )}
        </motion.div>

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  {editingTodo ? "Edit Aktivitas" : "Tambah Aktivitas"}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Judul Aktivitas
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-green focus:outline-none transition-colors"
                    placeholder="Contoh: Baca Al-Quran"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-green focus:outline-none transition-colors resize-none"
                    placeholder="Deskripsi aktivitas..."
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-green focus:outline-none transition-colors"
                  >
                    <option value="daily">Harian</option>
                    <option value="preparation">Persiapan</option>
                    <option value="special">Spesial</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-primary-green text-white rounded-xl font-medium hover:bg-primary-green/90 transition-colors shadow-md"
                  >
                    {editingTodo ? "Simpan" : "Tambah"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* City Selection Modal */}
        {showCityModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center z-[60]" style={{ animation: 'fadeIn 0.2s ease-out' }}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white rounded-t-3xl md:rounded-3xl p-5 md:p-6 w-full md:max-w-sm max-h-[70vh] md:max-h-[80vh] overflow-y-auto shadow-2xl will-change-transform"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Pilih Lokasi</h3>
                <button
                  onClick={() => setShowCityModal(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-xs md:text-sm text-gray-600 mb-3">
                Pilih kota untuk jadwal sholat yang akurat
              </p>

              <div className="space-y-1.5">
                {availableCities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => changeCity(city.id, city.name)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm ${
                      cityId === city.id
                        ? 'bg-primary-green text-white shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{city.name}</span>
                      {cityId === city.id && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Swipe indicator for mobile */}
              <div className="md:hidden flex justify-center mt-4">
                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
