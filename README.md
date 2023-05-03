# Dekiru Server 

Dekiru is A Japanese/Spanish language learning platform that connects Spanish and Japanese students and allows language exchange opportunities/classes

# Deployed API

The deployed API can be found at the link: "https://dekiru.fly.dev/"

All the routes described in the "API Routes" section are valid endpoints against this URL. For example, "https://dekiru.fly.dev/api/user/listHomeUsers"

The complete deployed application can be found at the following link: "https://dekiru.vercel.app/"

# Environment Variables

If the project is to be run locally, a .env file must be created in the root directory.

This file must include all of these environment variables:

- PORT
- MONGODB_URI
- ORIGIN
- CLOUDINARY_NAME
- CLOUDINARY_KEY
- CLOUDINARY_SECRET
- TOKEN_SECRET
- SALT
- STRIPE_API_KEY

To install all the dependencies used in the project, simply run the command:
```
npm install
```

# Postman Collection

In the root directory of the project, you will find a JSON file called "Dekiru.postman_collection.json". Throughout the development of this project, Postman is used to test our API. This file can be imported directly as a collection in Postman to view all the testing work. The requests are organized by folders according to their corresponding routes. Each request includes different examples of responses and error handling.

# API Routes

## **User routes**:

| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /api/users/listHomeUsers             | GET               | [users]                           | Get Home Page Displayed Users     |
| /api/users/listAllPeople             | GET               | [users]                           | Get All DB Users     |
| /api/users/getUserClasses/:id             | GET               | [classes]                           | Get All User Classes from DB     |
| /api/users/getUserFriends/:id          | GET               | [users]                           | Get All User Friends from DB     |
| /api/users/getOneUser/:id             | GET               | {user}                          | Get one User from the DB     |
| /api/users/getPopulatedUser/:id             | GET               | {user}                          | Get one User with Populated fields from the DB     |
| /api/users/getUserMatch/:id             | GET               | {user}                          | Get Matched User from the DB     |
| /api/users/getNearUsers/:userId             | GET               | [users]                          | Get nears Users from DB     |
| /api/users/edit/:id             | PUT               | {user}                           | Edit user from DB     |
| /api/users/makeFriend/:friend_id/:id             | PUT               | {updatedUser}                           | UpdatedUser user from DB     |
| /api/users/unfollow/:friend_id/:id             | PUT               | {updatedUser}                           | updatedUser user from DB     |
| /api/users/delete/:id             | DELETE               | {msg: "Successfully deleted"}                           | Remove user from DB     |

## **Class routes**:

| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /api/class/list/:skipValue         | GET               | [classes]                           | Get all classes from DB     |
| /api/class/getOne/:class_id   | GET               | {class}                           | Get one class from DB     |
| /api/class/create             | POST               | 201                           | Create class     |
| /api/class/join/:class_id/:user_id         | PUT            | {msg: "successfully joined the class"}                           | Join one class     |
| /api/class/leave/:class_id/:user_id         | PUT            | {updatedUser}                           | Leave one class     |
| /api/class/edit/:class_id         | PUT            | {updatedClass}                           | Edit one class     |
| /api/class/deletee/:class_id         | DELETE            | 200                           | Delete one class     |

## **Conversation routes**:
            
| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /api/conversation/list         | GET               | [conversations]                           | List all conversations from DB     |
| /api/conversation/getOne/:id         | GET               | {conversation}                         | Get one conversation from DB     |
| /api/conversation/create         | GET               | [####]                           | ####     |

## **Message routes**:

| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /api/message/list         | GET               | [messages]                           | List all messages from DB     |
| /api/message/getOne/:id         | GET               | {message}                           | Get one Message from DB     |
| /api/message/create         | POST               | {msg: "Message successfully sent"}                        | Create message (send)     |
| /api/message/delete/:id         | DELETE               | {msg: "Message successfully deleted"}                           | Delete message     |

## **Post routes**:

| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /api/post/list         | GET               | [posts]                           | Get all posts from DB     |
| /api/post/getOnePost/:id         | GET               | {post}                           | Get single post from DB     |
| /api/post/create         | POST               | {msg: "Post successfully created"}                           | Create one Post     |
| /api/post/edit/:id         | PUT               | {msg: "Post successfully edited"}                           | Edit post from DB     |
| /api/post/delete/:id         | DELETE               | {msg: "Post successfully deleted"}                           | Delete post from DB     |

## **Review routes**:

| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /api/review/list         | GET               | [reviews]                           | Get Reviews from DB     |
| /api/review/create         | GET               | {create}                        | Create Review     |
| /api/review/edit/:id         | PUT               | {msg: "Review successfully edited"}                           | Edit Review from DB     |
| /api/review/delete/:id            | DELETE               | {msg: "Review successfully deleted"}                           | Delete Review from DB     |

## **Auth routes**:

| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /api/auth/getLoggedUser            | GET              | {user}    | Get Logged User             |
| /api/auth/signup            | POST              | {message: 'New User created!'}    | Create a new user             |
| /api/auth/login             | POST              | `Token`    | Log user in             |