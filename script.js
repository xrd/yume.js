var scriptsRef;

function init() {

firebase.database.enableLogging(true)
var firebaseApp = firebaseInit();
var db = firebaseApp.database()

// create Vue app
var app = new Vue({
  mounted: function() {
    firebase.auth().onAuthStateChanged( this.onUserLogin );
  },
  // element to mount to
  el: '#app',
  // initial data
  data: {
    user: {},
    scripts: [],
    name: "",
    selectedScript: undefined,
    newScript: {}
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
    addItem: function() {
      console.log( "Creating new item" );
      this.$firebaseRefs.scripts.push({
        name: this.name
      })
      this.name = ""
    },
    addLine: function() {
      if( !this.selectedScript.lines ) {
        this.selectedScript.lines = []
      }
    },
    onUserLogin: function(user) {
      console.log( "Logged in success!");
      if (user) {
        this.user = user;
        this.$bindAsArray( 'scripts', db.ref( '/scripts/' + user.uid )
        this.$bindAsArray( 'lines', db.ref( '/lines' )
        console.log( "email", this.user.email );
      }
    },
    removeScript: function (script) {
      // console.log( "Script", script )
      this.$firebaseRefs.scripts.child(script['.key']).remove()
    }
  }
})
}

init();
