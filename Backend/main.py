from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from game import Game

# Run with: uvicorn main:app --reload

app = FastAPI()

origins = [
	"http://localhost:5173"
]
app.add_middleware(
	CORSMiddleware,
	allow_origins = origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

games = {}
n_uid = 0

@app.get("/game")
def get_game(game_id: int):
	if game_id not in games:
		return {"error": f"game id {game_id} doesn't exist."}
	return {"message":"success", "game_id":game_id, "game":games[game_id]}

@app.get("/tick")
def tick_game(game_id: int):
	if game_id not in games:
		return {"error": f"game id {game_id} doesn't exist."}
	games[game_id].tick()
	return {"message":"success", "game_id":game_id, "game":games[game_id]}

@app.put("/action")
def make_action(game_id: int, action: int):
	if game_id not in games:
		return {"error": f"game id {game_id} doesn't exist."}
	if action == 3:
		games[game_id].left()
	if action == 1:
		games[game_id].right()
	return {"message":"success", "game_id":game_id, "game":games[game_id]}

@app.put("/game")
def create_game(game_id: Union[int, None] = None):
	global n_uid
	if game_id == None:
		while n_uid in games:
			n_uid += 1
		game_id = n_uid
	else:
		if game_id in games:
			return {"error": f"game id {game_id} already exists."}
	games[game_id] = Game()
	return {"message":"success", "game_id":game_id}

@app.delete("/game")
def delete_game(game_id: int):
	if game_id not in games:
		return {"error": f"game id {game_id} doesn't exist."}
	del games[game_id]
	return {"message":"success", "game_id":game_id}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}