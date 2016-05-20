//connected with routes
//create all methods that link us to the server side,to the database
//$http links our posts to the database.
//corespond to the routs folder. angular connects with server

app.factory('posts', ['$http', 'auth', function($http, auth) {
  var postService = {
    posts: [],

    getAll: function() {
      $http.get('/posts').then(function(data) {
  
        angular.copy(data.data, postService.posts);
      });
    },

    get: function(id) {
      return $http.get('/posts/' + id, {
        headers: {Authorization: 'Bearer ' + auth.getToken()}
      }).then(function(res){
        return res.data;
      });
    },

    create: function (post) {
      $http.post('/posts', post, {
        headers: {Authorization: 'Bearer ' + auth.getToken()}
      })
      .success(function(data){
        postService.posts.push(data);
      });
    },

      upvote: function(post) {
        return $http.put('/posts/' + post._id + '/upvote', null, {
          headers: {Authorization: 'Bearer ' + auth.getToken()}
        })
        .success(function(data){
          return post.upvotes += 1;
      })
    },

    addComment: function(id, comment) {
      return $http.post('/posts/' + id + '/comments', comment,{
        headers: {Authorization: 'Bearer ' + auth.getToken()}
      });
    },

    upvoteComment: function(post, comment) {
      return $http.put('/posts/' + post._id + '/comments/' + comment._id +'/upvote',{
        headers: {Authorization: 'Bearer ' + auth.getToken()}
      })
      .success(function(data){
        comment.upvotes ++;
      });
    }
  };

  return postService;
}]);

