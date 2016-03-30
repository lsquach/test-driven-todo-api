// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
   { _id: 1, task: 'Laundry', description: 'Wash clothes' },
   { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
   { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   res.send({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   var id = todos.length+1;
   var task = req.body.task;
   var desc = req.body.description;
   var newTodo = { _id: id, task: task, description: desc};
   todos.push(newTodo);
   res.send(newTodo);
   //console.log(todos);

});

app.get('/api/todos/:id', function show(req, res) {
  var id = req.params.id;
  var parseID = parseInt(id);
  todos.forEach(function(e) {
      if (e._id === parseID) {
        res.send(e);
      }
    });

  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   var id = req.params.id;
   var parseID = parseInt(id);
   var task = req.body.task;
   var desc = req.body.description;
   todos.forEach(function(e){
     if (e._id === parseID) {
       e.task = task;
       e.description = desc;
       res.send(e);
     }
   });
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
   var id = req.params.id;
   var parseID = parseInt(id);
    todos.forEach(function (e){
        if (e._id === parseID) {
            todos.splice(parseID-1,1);
            res.send({});
          }
        });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
