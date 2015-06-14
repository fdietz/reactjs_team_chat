export default {

  setCurrentUser: function(user) {
    this.currentUser = user;
  },

  getCurrentUser: function() {
    return this.currentUser;
  }
}