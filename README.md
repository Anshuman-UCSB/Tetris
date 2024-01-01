
# Tetris

A brief description of what this project does and who it's for


## Run

Clone the project

```bash
  git clone https://github.com/Anshuman-UCSB/Tetris.git ./tetris
```

Go to the project directory

```bash
  cd tetris
```

### Backend
Install dependencies

```bash
  python -m venv ./venv
  ./venv/Scripts/Your-activation-Scripts
  cd ./Backend
  pip intstall -r requirements.txt
```

Start the server, this requires [uvicorn](https://www.uvicorn.org/)

```bash
  uvicorn main:app --reload
```

### Frontend
Install dependencies

```bash
  cd ./Frontend
  npm install
```

Start front end in development mode

```bash
  npm run dev
```

Optionally you can build the application and serve it using any method you like

```bash
  npm run build
  cd ./dist
```
## API Reference

## Get Game Details
### `GET /game`
Retrieve details for a specific game.

#### Parameters
- `game_id` (int): The unique identifier for the game.

#### Response
- `200 OK`: Successful response.
  ```json
  {
    "message": "success",
    "game_id": <game_id>,
    "game": <game_details>
  }
  ```
- `404 Not Found`: If the specified `game_id` doesn't exist.
  ```json
  {
    "message": {
      "error": "game id <game_id> doesn't exist."
    }
  }
  ```

## Tick Game
### `GET /tick`
Advance the game state by one tick.

#### Parameters
- `game_id` (int): The unique identifier for the game.

#### Response
- `200 OK`: Successful response.
  ```json
  {
    "message": "success",
    "game_id": <game_id>,
    "game": <updated_game_details>
  }
  ```
- `404 Not Found`: If the specified `game_id` doesn't exist.
  ```json
  {
    "message": {
      "error": "game id <game_id> doesn't exist."
    }
  }
  ```

## Make Game Action
### `PUT /action`
Perform a specific action in the game.

#### Parameters
- `game_id` (int): The unique identifier for the game.
- `action` (int): The action to be performed (0: Rotate, 1: Right, 3: Left, 4: Drop, 5: Store).

#### Response
- `200 OK`: Successful response.
  ```json
  {
    "message": "success",
    "game_id": <game_id>,
    "game": <updated_game_details>
  }
  ```
- `404 Not Found`: If the specified `game_id` doesn't exist.
  ```json
  {
    "message": {
      "error": "game id <game_id> doesn't exist."
    }
  }
  ```

## Create Game
### `PUT /game`
Create a new game.

#### Parameters
- `game_id` (int, optional): The unique identifier for the game. If not provided, a new identifier will be generated.

#### Response
- `201 Created`: Successful response.
  ```json
  {
    "message": "success",
    "game_id": <game_id>
  }
  ```
- `404 Not Found`: If the specified `game_id` already exists.
  ```json
  {
    "message": {
      "error": "game id <game_id> already exists."
    }
  }
  ```

## Delete Game
### `DELETE /game`
Delete a specific game.

#### Parameters
- `game_id` (int): The unique identifier for the game.

#### Response
- `200 OK`: Successful response.
  ```json
  {
    "message": "success",
    "game_id": <game_id>
  }
  ```
- `404 Not Found`: If the specified `game_id` doesn't exist.
  ```json
  {
    "message": {
      "error": "game id <game_id> doesn't exist."
    }
  }
  ```
