const jsonServer = require('json-server');
const auth = require('json-server-auth');

const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();



const PORT = 3000;


app.db = router.db;

app.use(middlewares);
app.use(auth);
app.use(router);
//app.listen(3000)
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});