const mockData = require('./mockdata');
const helpers = require('./helper/helpers');
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const bodyParser = require('body-parser')


const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();



const PORT = 3000;


app.db = router.db;

app.use(middlewares);
app.use(bodyParser.json());
app.post('/getairs', (req, res)=>{
 const {from, to, way, endDate, startDate, passengersCount } = req.body; 

//  let getDay;
//  let getDayBack;

//  const startDay = new Date(startDate).getDay();
//  const endDay = new Date(endDate).getDay();

//  const date = new Date(endDate)- new Date(startDate);
//  const arrDate = mockData.days[helpers.getRandomElementArray(mockData.days)];
//  const arrDateBack = mockData.days[helpers.getRandomElementArray(mockData.days)];

 const available =()=> helpers.getRandomNumberPassengers(passengersCount);
 
 const price =()=> mockData.price[helpers.getRandomElementArray(mockData.price)];
 
 const timeWay =()=>mockData.timeWay[helpers.getRandomElementArray(mockData.timeWay)];
 
 const flightNumber = ()=>{return mockData.flightNumber+Math.floor(Math.random() * 9999)};

 const direct = ()=> {const isDirect = mockData.direct[helpers.getRandomElementArray(mockData.direct)];
  let airportRedirect;
  if(isDirect===true) {
    airportRedirect = [[''], ['']];
   }
   if(isDirect===false) {
    airportRedirect = mockData.airportRedirect[helpers.getRandomElementArray(mockData.airportRedirect)];
    ;
   }
   return {isDirect, airportRedirect}
};
 
 const startTime =()=> mockData.startTime[helpers.getRandomElementArray(mockData.startTime)];
 
//  if (date >=604800000) {
//   getDay = arrDate;
//   getDayBack = arrDateBack;
//  } else {
//   getDay = helpers.filterArray([startDay, endDay].sort((a,b) =>a-b), arrDate);
//   getDayBack = helpers.filterArray([startDay, endDay].sort((a,b) =>a-b), arrDateBack);
//    if(getDay.length === 0) {
//     getDay = [startDay];
//    }
//    if(getDayBack.length === 0) {
//     getDayBack = [startDay];
//    }
//  }

 const isFlight = ()=>  mockData.isFlight[helpers.getRandomElementArray(mockData.isFlight)]

 const wayFunc =  () =>{return {startTime: startTime(), timeWay: timeWay(), flightNumber:flightNumber(),  price: price(),  available: available(), isFlight: isFlight(), direct: direct()}};

 const thereWay = [ wayFunc(), wayFunc(), wayFunc(),wayFunc(),wayFunc(),wayFunc(),wayFunc(),wayFunc(),wayFunc(), wayFunc()]

 const backWay = [ wayFunc(), wayFunc(), wayFunc(),wayFunc(),wayFunc(),wayFunc(),wayFunc(),wayFunc(),wayFunc(), wayFunc()];

 if(way==='one-way') {
  return res.json({from, to, way, endDate, startDate, thereWay});
 }


if(way==='round') {
  return res.json({from, to, way, endDate, startDate, thereWay, backWay});
}

});


app.use(auth);
app.use(router);
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});