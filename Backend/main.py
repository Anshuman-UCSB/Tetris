from typing import Union
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from game import Game

# Run with: uvicorn main:app --reload 
# or just call this file
app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost",
    "http://127.0.0.1",
    "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# TODO: add timeouts and clean up games
games = {}
n_uid = 0


@app.get("/game", status_code=200)
def get_game(game_id: int, res: Response):
    if game_id not in games:
        res.status_code = 404
        return {"message": {"error": f"game id {game_id} doesn't exist."}}
    return {"message": "success", "game_id": game_id, "game": games[game_id]}


@app.get("/tick", status_code=200)
def tick_game(game_id: int, res: Response):
    if game_id not in games:
        res.status_code = 404
        return {"message": {"error": f"game id {game_id} doesn't exist."}}
    games[game_id].tick()
    return {"message": "success", "game_id": game_id, "game": games[game_id]}


@app.put("/action", status_code=200)
def make_action(game_id: int, action: int, res: Response):
    if game_id not in games:
        res.status_code = 404
        return {"message": {"error": f"game id {game_id} doesn't exist."}}
    if action == 0:
        games[game_id].rotate()
    if action == 3:
        games[game_id].left()
    if action == 1:
        games[game_id].right()
    if action == 4:
        games[game_id].drop()
    if action == 5:
        games[game_id].store()
    return {"message": "success", "game_id": game_id, "game": games[game_id]}


@app.put("/game", status_code=201)
def create_game(res: Response, game_id: Union[int, None] = None):
    global n_uid
    if game_id == None:
        while n_uid in games:
            n_uid += 1
        game_id = n_uid
    else:
        if game_id in games:
            res.status_code = 404
            return {"message": {"error": f"game id {game_id} doesn't exist."}}
    games[game_id] = Game()
    games[game_id].tick()
    return {"message": "success", "game_id": game_id}


@app.delete("/game", status_code=200)
def delete_game(game_id: int, res: Response):
    if game_id not in games:
        res.status_code = 404
        return {"message": {"error": f"game id {game_id} doesn't exist."}}
    del games[game_id]
    return {"message": "success", "game_id": game_id}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", reload=True)
