module.exports = {
    authenticateUser: require('./authenticate-user'),
    registerUser: require('./register-user'),
    retrieveUser: require('./retrieve-user'),
    addInstruments : require('./add-instruments'),
    deleteInstrument : require('./delete-instrument'),
    modifyUser : require('./modify-user'),
    toggleFavs : require('./toggle-favs'),
    retrieveFavs : require('./retrieve-favs'),
    searchUsers : require('./search-users'),
    saveProfileImage : require('./save-image'),
    loadProfileImage : require('./load-profile-image'),
    loadProfileImageUrl : require('./load-profile-url'),
    createChat: require('./create-chat'),
    retrieveChat: require('./retrieve-chat'),
    retrieveChats: require('./retrieve-chats'),
    sendMessage: require('./send-message'),
    retrieveMusicians: require('./retrieve-musicians')
    //createTask: require('./create-task'),
    //listTasks: require('./list-tasks'),
    //modifyTask: require('./modify-task'),
    //removeTask: require('./remove-task')
}
