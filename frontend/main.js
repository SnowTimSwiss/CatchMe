import L from 'https://cdn.skypack.dev/leaflet';
import { io } from 'https://cdn.skypack.dev/socket.io-client';
const socket = io(window.location.protocol + '//' + window.location.hostname + ':4000');
const map = L.map('app').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);
navigator.geolocation.watchPosition(pos => {
  const { latitude, longitude } = pos.coords;
  socket.emit('location', { code: prompt('Spielcode:'), location: [latitude, longitude] });
}, console.error, { enableHighAccuracy: true });
socket.on('update', data => { console.log(data); });
