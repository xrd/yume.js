var scriptsRef;

function init() {

var firebaseApp = firebaseInit();
var db = firebaseApp.database()

// create Vue app
var app = new Vue({
  // element to mount to
  mounted: function() {
    firebase.auth().onAuthStateChanged( this.onUserLogin );
  },
  el: '#app',
  // initial data
  data: {
    user: undefined,
    name: undefined
  },
  // firebase binding
  // https://github.com/vuejs/vuefire
  // firebase: {
  //   scripts: db.  // : db.scriptsRef
  // },
  methods: {
    loadScript: function() {
      console.log( "Inside something here.");
    },

    afterSignIn: function(result) {
      console.log( "Inside the sign in action" );
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    },

    signInError: function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have already signed up with a different auth provider for that email.');
      } else {
        console.error(error);
      }
    },

    loginToFirebase: function() {
      if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup( provider ).then( this.afterSignIn ).catch( this.signInError );
      } else {
        this.user = undefined;
        firebase.auth().signOut();
      }
    },
    addItem () {
      this.$firebaseRefs.scripts.push({
        name: this.name
      })
    },
    onUserLogin: function(user) {
      console.log( "Logged in success!");
      if (user) {
        this.user = user;
        this.$bindAsObject('scripts', firebase.database().ref( this.user.uid + '/scripts') )
        console.log( "email", this.user.email );
      }
    },
    removeScript: function (user) {
      usersRef.child(user['.key']).remove()
    }
  }
})
}

init();
