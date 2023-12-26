from typing import Union
from fastapi import FastAPI
from game import Game

# Run with: uvicorn main:app --reload

app = FastAPI()

games = {}
n_uid = 0

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.put("/game")
def create_game(game_id: Union[int, None] = None):
	global n_uid
	if game_id == None:
		game_id = n_uid
		n_uid += 1
	else:
		if game_id in games:
			return {"error": "game id "+game_id+" already exists."}
	return {"game":games[game_id]}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}