const express = require('express');

//require controller
const todoController = require('./controllers/todoController');
//setup express app, entry-point of the app
const app = express();

//setup template engines
app.set('view engine', 'ejs');

//setup static files to use on every route we request using middleware
app.use(express.static('./public'));

//fire controller
todoController(app);

//listen to port
/*app.listen(3000);
console.log('listening to port 3000');*/

app.listen(port, ()=>{
    console.log('Our app is running on http://localhost:' + port);
});