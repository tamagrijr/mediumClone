

- users
  - GET `users/:id` Gets user data from database.
  - POST `users/` Create new user and stores in database.
  - POST `users/token`
  - PUT `users/:id` Edit profile in database.
  - DELETE `users/:id` Delete profile from database.

- stories
  - GET `stories/:id` Gets story data from database.
  - GET `stories/:id/comments` Gets all messages from database for story with id.
  - POST `stories/` Create new story and stores in database.
  - PUT `stories/:id` Edit story in database.
  - DELETE `stories/:id` Delete story from database.

- comments
  - POST `stories/:storyId/comments` Creates and stores new comment.
  - PUT `/comments/:id` Edits a comment record from database.
  - DELETE `/comments/:id` Deletes a comment from the database.

- like
  - POST `stories/:storyId/likes` Creates and stores a new like-value.
  - DELETE `/likes/:id` Deletes the like record.
