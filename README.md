# tsoa-sequelize-jwt-app
Boilerplate project for a TypeScript API with TSOA, ExpressJS, Sequelize and Swagger UI

The api endpoint: http://localhost:1202/api/ 
Swagger UI: http://localhost:1202/docs

# Motivation

For the last few months I was contemplating whether I should start using typescript for our company's online microservices.
In the past my approach was to create the Swagger specification in YAML first and then generate javascript code, write the controllers etc.

Then I found TSOA and was a bit reluctant to use it because it reverses the order and I never really liked code annotations.
After a few hours of trying I found it quite easy to use and decided to go with it.
Especially after I found Jesus Felipe Chavarro Muñoz's repo https://github.com/jesusfchavarro/tsoa-app

I always try to keep things simple. While searching for boilerplate code with typescript support for Swagger I found several solutions but they felt over-engineered, probably the authors came from java and applied the same enterprise philosophy to javascript. Jesus' code is very simple and it uses almost the latest package versions, so I took his repo and added what I needed.

Instead of grouping files by type like models/controllers/services I grouped them by endpoint functionality, so that every file related to a particular endpoint is in the same directory. Easy to navigate.

There is an implementation for jwt token authorization for the project endpoint. The token is generated by the login endpoint that takes an email address and password. The password hash generator and comparison method is translated from http://web2py.com/ which is considered a highly secure encryption.

When you implement a new endpoint there is not much boilerplate code to write. The model is being used by Sequelize and also by TSOA for the response type. There is only 3 files needed for a new endpoint:

* controller with the annotations: that is transformed into an express API endpoint
* model: representing a database table and also the response type of the API
* service: the actual implementation of the business logic, fetching records from DB and eventually postprocessing, manipulating them

If you need to return a different response type which does not match the database record, then obviously you will need to define an additional model for that.

# Ingredients

This boilerplate code is based on:
* TSOA (https://github.com/lukeautry/tsoa)
* Sequelize with typescript (https://github.com/RobinBuschmann/sequelize-typescript)
* JWT Authentication
* Error handling middleware needed because TSOA responds with HTML if an error occurs (https://gist.github.com/AmazingTurtle/f15c0aa33aba7a222b96903ff310f590)
* Dotenv (https://github.com/motdotla/dotenv)

# Dotenv sample

```
DATABASE=missionImpossible
DIALECT=postgres
DB_USER=tomCruise
DB_PASS=chooseToAccept
JWT_SECRET=rabbitsfoot
PORT=8080
```


## Build and start server
```
npm start
```

## Build
```
// generate routes, swagger.json and compile typescript
npm run build

// generate swagger.json
npm run swagger-gen

// generate routes
npm run routes-gen
```
