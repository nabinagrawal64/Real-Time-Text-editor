const express = require('express');
const { createRoom } = require('../controller/createRoom'); 
const { joinRoom } = require('../controller/joinRoom');
const { getUsernameByRoomID } = require('../controller/getUsernameByRoomID'); 

const router = express.Router();

// Define the POST route for creating a room
router.post('/create-room', createRoom);
router.post('/join-room', joinRoom);
router.get('/user/:roomID', getUsernameByRoomID);

module.exports = router;
