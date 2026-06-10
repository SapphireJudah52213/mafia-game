async function refreshRoom() {
    const response =
        await fetch(`/room/${roomCode}`);

    const room =
        await response.json();

    updateUI(room);
}

setInterval(refreshRoom, 1000);
