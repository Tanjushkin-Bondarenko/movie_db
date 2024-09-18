import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

export function createMapBlock(containerDomNode: HTMLElement){
    const map = L.map(containerDomNode);
    map.setView([49.572, 32.091], 6)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'})
        .addTo(map);
    return map
}

export function AddPopupToMap(map: L.Map){
    const divPopup = document.createElement("div");
    L.popup()
    .setLatLng([51.513, -0.09])
    .setContent(divPopup)
    .openOn(map);
    return divPopup
}