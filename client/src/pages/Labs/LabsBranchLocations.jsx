import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const LabsBranchLocations = () => {
    const [location, setLocation] = useState({ lat: 28.7041, lng: 77.1025 }); // Default to Delhi coordinates
    const [error, setError] = useState(null);
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [latitude, setLatitude] = useState(28.7041); // Default latitude
    const [longitude, setLongitude] = useState(77.1025); // Default longitude

    const [fetchLocation, setFetchLocation] = useState(true); // State to control geolocation fetching
    const mapRef = useRef(null);
    const searchParams = new URLSearchParams(window.location.search);
    const labId = searchParams.get('LabId');

    const getGeolocation = () => {
        if (navigator.geolocation && fetchLocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lng: longitude });
                    setLatitude(latitude);
                    setLongitude(longitude);
                    getAddressFromCoords(latitude, longitude);
                    updateMap(latitude, longitude);
                },
                (err) => {
                    setError(err.message);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    const getAddressFromCoords = async (latitude, longitude) => {
        try {
            const GOOGLE_KEY_SECRET = "AIzaSyAwuwFlJ9FbjzZzWEPUqQPomJ8hlXdqwqo";

            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_KEY_SECRET}`
            );

            const results = response.data.results;

            if (results && results.length > 0) {
                const formattedAddress = results[0].formatted_address;
                const addressComponents = results[0].address_components;

                const pincodeComponent = addressComponents.find(component =>
                    component.types.includes('postal_code')
                );

                const cityComponent = addressComponents.find(component =>
                    component.types.includes('locality')
                );

                const stateComponent = addressComponents.find(component =>
                    component.types.includes('administrative_area_level_1')
                );

                setAddress(formattedAddress);
                setPincode(pincodeComponent ? pincodeComponent.long_name : '');
                setCity(cityComponent ? cityComponent.long_name : '');
                setState(stateComponent ? stateComponent.long_name : '');
            } else {
                setError('No results found');
            }
        } catch (error) {
            setError('Failed to fetch address');
        }
    };

    const updateMap = (latitude, longitude) => {
        if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 13);
            L.marker([latitude, longitude]).addTo(mapRef.current)
                .bindPopup('Current Location')
                .openPopup();
        }
    };

    useEffect(() => {
        getGeolocation();

        if (!mapRef.current) {
            const map = L.map('map').setView([28.7041, 77.1025], 13); // Default to Delhi coordinates
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            mapRef.current = map;
        }
    }, [fetchLocation]); // Only re-run effect if fetchLocation changes

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/branch-lab-address-update`, {
                address,
                pincode,
                city,
                labId,
                state,
                latitude,
                longitude
            });

            console.log('Response:', response.data);
            // window.location.href=`/Labs-location-Updated?LabId=${labId}&Address=${address.replace(/\s+/g, '-')}`
            window.location.href=`/`
        } catch (error) {
            console.error('Error:', error.message);
        }

        // Stop fetching geolocation updates when user interacts with inputs
        setFetchLocation(false);
    };

    return (
        <div className="container mt-5" style={{ backgroundColor: 'var(--bg-light-greenblue)' }}>
            <div className='py-4 px-4'>
                <h2 className="mb-4" style={{ color: 'var(--bg-dark-blue)' }}>Labs Locations</h2>
            </div>
            {error && <p className="alert alert-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label" style={{ color: 'var(--bg-dark-blue)' }}>Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                            // Resume fetching geolocation updates if input changes
                            setFetchLocation(true);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pincode" className="form-label" style={{ color: 'var(--bg-dark-blue)' }}>Pincode</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pincode"
                        value={pincode}
                        onChange={(e) => {
                            setPincode(e.target.value);
                            // Resume fetching geolocation updates if input changes
                            setFetchLocation(true);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label" style={{ color: 'var(--bg-dark-blue)' }}>City</label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                            // Resume fetching geolocation updates if input changes
                            setFetchLocation(true);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="state" className="form-label" style={{ color: 'var(--bg-dark-blue)' }}>State</label>
                    <input
                        type="text"
                        className="form-control"
                        id="state"
                        value={state}
                        onChange={(e) => {
                            setState(e.target.value);
                            // Resume fetching geolocation updates if input changes
                            setFetchLocation(true);
                        }}
                    />
                </div>
                <button type="submit" className="btn" style={{ backgroundColor: 'var(--bg-greenblue)', color: 'white' }}>Submit</button>
            </form>
            <div id="map" style={{ height: '450px', marginTop: '20px' }}></div>
        </div>
    );
};

export default LabsBranchLocations;
