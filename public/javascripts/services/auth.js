//registering a new user
//remember to inject services into controller
//logout uses the same services as registration


app.factory('auth', ['$http', '$window', function ($http, $window) {
   var auth = {};

//save token in localStorage
   auth.saveToken = function (token) {
    $window.localStorage['rereddit-jwt'] = token;
     
   };

//need to get token from localStorage
     auth.getToken = function (){
     return $window.localStorage['rereddit-jwt'];
   };

//send post request to /register with user.
//when done invoke auth.saveToken fnc to save the token in localStorage
   auth.register = function (user){
    return $http.post('/register', user).then(function(data){
       auth.saveToken(data.data.token);
    });
   };

//first need to get the token
//if has token means its logged in
   auth.isLoggedIn = function(){
     var token = auth.getToken();

     if(token){
       return true;
     } else {
       return false;
     }
   };

//if the auth.isLoggedIn is true, so has token 
//get that token and decod it to get the user info
//then return that username
    auth.currentUser = function(){
     if(auth.isLoggedIn()){
       var token = auth.getToken();
       var decodedToken = JSON.parse($window.atob(token.split('.')[1]));

       return decodedToken.username;
     }
   };

   auth.logIn = function(user){
    return $http.post('/login', user).success(function(data){
      // auth.currentUser();
      auth.saveToken(data.token);
    }) 
   };

//remove from local storage
   auth.logOut = function(){
     $window.localStorage.removeItem('rereddit-jwt');
   };

  return auth;
}]);

//register a new user by making a post req to /register route