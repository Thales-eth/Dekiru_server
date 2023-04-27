#   "####" Server 

Supein is A Japanese/Spanish language learning platform that connects Spanish and Japanese students and allows language exchange opportunities/classes

# API desplegada

La API desplegada puede encontrarse en el enlace: "#####"

Todas las rutas descritas en el apartado "Rutas de la aplicación" son endpoints válidos contra esta url. Así, por ejemplo "#####"

La aplicación completa desplegada se puede encontrar en el siguiente enlace: "####"

# Variables de Entorno

Si el proyecto quiere correrse en local, deberá crearse un archivo .env en el directorio raíz. 

Dicho archivo deberá comprender todas estas variables de entorno:

1. PORT
2. MONGODB_URI
3. ORIGIN
4. CLOUDINARY_NAME
5. CLOUDINARY_KEY
6. CLOUDINARY_SECRET
7. TOKEN_SECRET
8. SALT

Para instalar todas las dependencias utilizadas en el proyecto, simplemente se ha de ejecutar el comando:
```
npm install
```

# Colección Postman

En el directorio raíz del proyecto se encontrará una json denominado "####". A lo largo del desarrollo de este proyecto se usa Postman para testear nuestra api. Se puede importar este archivo directamente como una colección en Postman para visualizar todo el trabajo de testeo. Las peticiones están organizadas por carpetas según las correspondientes rutas. De cada petición se incluyen distintos ejemplos de respuestas y manejos de errores.

# Rutas de la aplicación

## **User routes**:

| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /api/users/list/:language             | GET               | [users]                           | Get all users from the DB     |
| /api/users/getOneUser/:id             | GET               | {user}                          | Get one User from the DB     |
| /api/users/edit/:id             | PUT               | {user}                           | Edit user from DB     |
| /api/users/delete/:id             | DELETE               | {msg: "Successfully deleted"}                           | Remove user from DB     |

## **Class routes**:

| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /api/class/list         | GET               | [classes]                           | Get all classes from DB     |
| /api/class/getOne/:class_id         | GET               | {class}                           | Get one class from DB     |
| /api/class/create         | POST               | {class}                           | Create class     |
| /api/class/join/:class_id         | PUT            | {msg: "successfully joined the class"}                           | Join one class     |
| /api/class/leave/:class_id         | PUT            | {msg: "successfully left the class"}                           | Leave one class     |

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