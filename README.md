
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

#### Get all items

```http
  GET /game
```

| Parameter | Type     | Description                | Returns JSON    | Error   |
| :-------- | :------- | :------------------------- | :-------------- | :------ |
| `game_id` | `string` | **Required**.              | {message, game_id, game_state} |{error} |

| Return Types | Value|
| :----------- | :--- |
| message      | "success" |
| game_id      | int       |
| game_state   | [Game](https://github.com/Anshuman-UCSB/Tetris/blob/main/Backend/game.py) |
| error        | "game id {game_id} doesn't exist." |
