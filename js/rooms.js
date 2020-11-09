let isPublic = true;

$('#create-chat-room-btn').click(function() {
    console.log("CReate chat room");

    let room = $('#create-chat-room-name').val();
    let host = username;
    let options = document.getElementsByClassName('create-chat-room-security')
    console.log(isPublic)

    const data = {room: room, host: username, isPublic: isPublic}

    if(username != null) {
        
        if(isPublic) {
            $('#main-content').html('');
            socketio.emit('create', data);

        } else {

        }

    } else {
        console.log("User not logged in")
    }
})

$('#create-chat-room-public-btn').click(function() {
    isPublic = true;
})

$('#create-chat-room-private-btn').click(function() {
    isPublic = false;
})

let room = function(host, isPrivate) {
    this.host = host;
    this.isPrivate = isPrivate;
    this.users = [];
    this.bannedUsers = [];

    this.setPrivate = function(password) {

    }

    this.setPublic = function() {

    }

    this.changeHost = function(host) {

    }

    this.kickUser = function(user) {

    }

    this.banUser = function(user) {

    }

    this.getUsers = function() {

    }

    this.getBannedUsers = function() {

    }

}