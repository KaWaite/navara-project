export async function fetchGeoJSON(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load GeoJSON: ${response.statusText}`);
    }
    return await response.json();
}
