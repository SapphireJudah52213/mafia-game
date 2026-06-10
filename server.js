const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const rooms = {};

function generateRoomCode() {
    return Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase();
}

app.post("/create-room", (req, res) => {

    const code = generateRoomCode();

    rooms[code] = {
        phase: "lobby",
        turn: 1,
        players: []
    };

    res.json({ code });
});

app.post("/join-room", (req, res) => {

    const { roomCode, name } = req.body;

    const room = rooms[roomCode];

    if (!room) {
        return res.status(404).json({
            error: "Room not found"
        });
    }

    const player = {
        id: Date.now().toString(),
        name,
        alive: true
    };

    room.players.push(player);

    res.json(player);
});

app.get("/room/:code", (req, res) => {

    const room = rooms[req.params.code];

    if (!room) {
        return res.status(404).json({
            error: "Room not found"
        });
    }

    res.json(room);
});

app.post("/vote", (req, res) => {

    const {
        roomCode,
        voterId,
        targetId
    } = req.body;

    const room = rooms[roomCode];

    if (!room.votes) {
        room.votes = {};
    }

    room.votes[voterId] = targetId;

    res.json({
        success: true
    });
});

const port =
    process.env.PORT || 3000;

app.listen(port, () => {
    console.log(
        "Running on port",
        port
    );
});
