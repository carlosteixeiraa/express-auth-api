## Express Auth API

This repo is an simple to use express auth api, with it you can register users and log them in. This can be used on multiple supports, like websites, web apps, android apps and other uses you can think off. It uses 4 packages, express, mongoose, bcrypt and body parser.

### Express
Express is used to make the routes for the API.

### Mongoose
Mongoose is used to connect the express app to the mongodb and save and get the users.

### Bcrypt
Bcrypt is used to hash the password, for a more secure app.

### Body parser 
Body parser is used to allow JSON on the POST methods.

### How to use it?
First of all to use it you will have to install NodeJS and mongodb.

Then clone the repository
```
git clone https://github.com/carlosteixeiraa/express-auth-api
```

Enter in the directory
```
cd express-auth-api
```

Install the packages
```
npm install or yarn install
```

Start the mongodb

If you using linux make sure you run it as root and if it is the first time you use mongodb and its a fresh install you will need to create the following directorys, /data/db

LINUX
```
sudo mongod
```

WINDOWS
```
mongod
```

### How to test it
If you wan't to test the API just install postman and make a POST call to localhost:3000/api/register,with application-json on the headers and on the body the following code.

```json
"name":"somerandomname",
"username":"someusername",
"email":"email@example.email",
"password":"somepasswordxd"
```

If you wan't to test the login do the same with the headers but on the body use this code.

```json
"email":"email@example.email",
"password":"somepasswordxd"
```

If you do that and it's all fine you should get the USER as the response.

### Disclaimer
This is free to use, if you wan't use it, if you wan't change it. There isn't no need to give credits.