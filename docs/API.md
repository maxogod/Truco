# Api Documentation

## Endpoints

### Websockets

* POST `/api/pusher`

### User auth

* POST `/api/auth/register` -> if 201 returns a User
* POST `/api/auth/login` -> if 200 returns a User
  
```json
- same request body for both POST endpoints:
  {
    "username": "letters and numbers only",
    "password": "letters, numbers and special characters except spaces"
  }
```

* GET `/api/auth/session` -> if 200 returns a User
* GET `/api/auth/logout`

### Friend requests

* GET `/api/friends/friendRequest/:targetUsername`
* GET `/api/friends/acceptFriendRequest/:targetUsername`

### Stats

* PUT `/api/stats/addWin`
* PUT `/api/stats/addLoss`
* PUT `/api/stats/updateRating`

```json
- request body for updateRating (the rest can be an empty body)
  {
    "ratingDifferential": 27 // it can be a possitive number to add rating or negative to substract
  }
```

## Models

### User

* _id: string
* username: string
* password: string
* rating: number
* wins: number
* losses: number
* friends: User[]
* friendRequests: User[]
