
# Routes - Backend
Returns JSONs

## Users
| HTTP Method | Path        | Action |
|-------------|-------------|--------|
| POST        | `users/`    | Create a new User       |
| GET         | `users/:id` | Get a User's data       |
| PUT         | `users/:id` | Edit a User's account   |
| DELETE      | `users/:id` | Delete a User's account |
| POST        | `users/token` | Create a JWT access token |

## Stories
| HTTP Method | Path                   | Action                 |
|-------------|------------------------|------------------------|
| GET         | `stories/:id/comments` | Get a Story's Comments |
| POST        | `stories/`             | Create a new Story     |
| GET         | `stories/:id`          | Get a Story            |
| PUT/PATH    | `stories/:id`          | Edit a Story           |
| DELETE      | `stories/:id`          | Delete a Story         |

## Comments
| HTTP Method | Path                         | Action                           |
|-------------|------------------------------|----------------------------------|
| GET         | `/comments/:userId`          | Get Comments of a User           |
| POST        | `/stories/:storyId/comments` | Create a new Comment for a Story |
| PUT/PATCH   | `/comments/:id`              | Edit a Comment                   |
| DELETE      | `/comments/:id`              | Delete a Comment                 |

<!-- MIRA Should 'get' be modified to end with a collection-type path instead? -->
<!-- MIRA Will the comments always be associated with a story in the path, like POST? -->
<!-- MIRA Bookmarks and Follows? -->

## Likes
| HTTP Method | Path                         | Action                     |
|-------------|------------------------------|----------------------------|
| POST        | `/stories/:storyId/likes`     | Creates a Like for a Story |
| DELETE      | `/stories/:storyId/likes/:id` | Deletes a Like             |

### Follows
| HTTP Method | Path                     | Action                     |
|-------------|--------------------------|----------------------------|
| GET         | `/users/:userId/follows` |
| POST        | `/users/:userId/follows` |
| DELETE      | `/users/:userId/follows/:id` |



### Bookmarks