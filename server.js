// require express and other modules
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [{
    _id: 1,
    task: 'Laundry',
    description: 'Wash clothes'
  },
  {
    _id: 2,
    task: 'Grocery Shopping',
    description: 'Buy dinner for this week'
  },
  {
    _id: 3,
    task: 'Homework',
    description: 'Make this app super awesome!'
  }
];
var i = 4;


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

  // var filter = req.query.task;
  // var answer = [];
  //
  // function contains(a, obj) {
  //   for (var i = 0; i < a.length; i++) {
  //     if (a[i].task === obj) {
  //       answer.push[a[i]];
  //     }
  //   }
  //   return answer;
  // }
  //
  // contains(todos, filter);
  // res.json(answer);

});

app.get('/api/todos', function index(req, res) {
  res.json({
    todos: todos
  });
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
  req.body._id = i;
  i++;
  todos.push(req.body);
  res.json(req.body);
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
  for (j = 0; j < todos.length; j++) {
    if (todos[j]._id == req.params.id) {
      var current = todos[j];
      res.json(current);
    }
  }
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
  for (j = 0; j < todos.length; j++) {
    if (todos[j]._id == req.params.id) {
      var currentTodo = todos[j];
      currentTodo.task = req.body.task;
      currentTodo.description = req.body.description;
      res.json(currentTodo);
    }
  }
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */
  for (j = 0; j < todos.length; j++) {
    if (todos[j]._id == req.params.id) {
      var current = todos[j];
      res.json(current);
      todos.splice(j, 1);
    }
  }
  //res.send("Removed" + current);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
