import db from './models/index.mjs';
import initBugsController from './controllers/bugs.mjs';
import initUsersController from './controllers/users.mjs';

// import your controllers here

export default function bindRoutes(app) {

  // initialize the controller functions here
  // pass in the db for all callbacks
  const bugsController = initBugsController(db);
  const userController = initUsersController(db)
  // define your route matchers here using app
  app.get('/', (request,response)=>{
    response.render('home')
  })

  app.post('/bugs', bugsController.addbug)
  app.get('/features', bugsController.seeFeatures)
  app.get('/features/:featureID', bugsController.getSpecificFeature)

  app.get('/bugs', bugsController.showAllBugs)
  app.post('/features',bugsController.postFeature)
  app.post('/users', userController.addUser)
  app.post('/users/login', userController.getUser)
}
