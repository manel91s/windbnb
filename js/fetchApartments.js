export async function consultApartments() {
    
    const URL = `./BD/stays.json`;

    const fetchURL = fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await fetchURL;
    const response = await result.json();
    
    return response;
}