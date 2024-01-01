from random import shuffle, random
DEBUG = True
class Game:
	def __init__(self):
		self.grid = [[[0,"bg"] for _ in range(10)] for _ in range(20)]
		# for i,p in enumerate("IOTJLSZ"):
		# 	self.grid[0][i] = (0,p)
		self.activePiece = []
		self.activeType = None
		self.rotation = 0
		self.center = None
		self.alive = True
		self.stored = None
		self.nextPieces = []
		self.groundedTime = 2
		self.just_stored = False
		self.score = 0
		self.combo = 0
		self.messages = {}
		if DEBUG:
			self.nextPieces = list("O"*100)
			for y in range(9,20):
				for x in range(10):
					if x in (5,6): continue
					self.grid[y][x]=[1,'I']
		# id, color
	def pieceBag(self):
		choices = list("IOTJLSZ")
		if self.nextPieces:
			choices.remove(self.nextPieces[-1])
		shuffle(choices)
		return choices
	def store(self):
		if self.just_stored: return
		for x,y in self.activePiece:
			self.grid[y][x] = [0, "bg"]
		stored_type = self.stored
		self.stored = self.activeType
		self.createPiece(stored_type)
		self.just_stored=True
	def clearLines(self):
		clearedLines = 0
		self.messages = {}
		for y in range(19,-1,-1):
			if all(v[0] == 1 for v in self.grid[y]):
				clearedLines += 1
			else:
				if clearedLines:
					for x in range(10):
						self.grid[y+clearedLines][x],self.grid[y][x]=self.grid[y][x],[0,'bg']
		if clearedLines > 0:
			self.combo+=1
			self.score += 50 * self.combo
			if self.combo > 0:
				self.messages[random()] = f"{self.combo}x combo!"
			self.messages[random()] = f'{[None,"single", "double", "triple", "tetris!"][clearedLines]}'
		else:
			self.combo=0
		self.score += [0,100,300,500,800][clearedLines]

	def rotatePoint(self, point, center):
		x,y = point
		cx,cy = center
		return (int(cx-(y-cy)),int((x-cx)+cy))
	def wallKick(self, piece):
		def validPoint(p, aug):
			x,y = p
			dx,dy = aug
			return 0<=x+dx<10 and 0<=y+dy<20 and self.grid[y+dy][x+dx][0]!=1
		wallKicks = [
			[(0, 0), (-1, 0), (-1, 1), ( 0,-2), (-1,-2)],
			[(0, 0), ( 1, 0), ( 1,-1), ( 0, 2), ( 1, 2)],
			[(0, 0), ( 1, 0), ( 1, 1), ( 0,-2), ( 1,-2)],
			[(0, 0), (-1, 0), (-1,-1), ( 0, 2), (-1, 2)],
		] if self.activeType!='I' else [
			[(0, 0), (-2, 0), ( 1, 0), (-2,-1), ( 1, 2)],
			[(0, 0), (-1, 0), ( 2, 0), (-1, 2), ( 2,-1)],
			[(0, 0), ( 2, 0), (-1, 0), ( 2, 1), (-1,-2)],
			[(0, 0), ( 1, 0), (-2, 0), ( 1,-2), (-2, 1)],
		]
		for wk in wallKicks[self.rotation]:
			if all(validPoint(p, wk) for p in piece):
				self.rotation += 1
				self.rotation %= 4
				self.center[0]+=wk[0]
				self.center[1]+=wk[1]
				return [(x+wk[0],y+wk[1]) for x,y in piece]
		return None
	def rotate(self):
		self.activePiece = self.wallKick([self.rotatePoint(p, self.center) for p in self.activePiece]) or self.activePiece
		self.render()
	def createPiece(self, piece_type=None):
		if len(self.nextPieces) < 7:
			self.nextPieces+=self.pieceBag()
		if piece_type is None:
			self.clearLines()
		self.groundedTime = 2
		self.activeType = piece_type or self.nextPieces.pop(0)
		self.rotation = 0
		match(self.activeType):
			case "I":
				self.activePiece = [(3,0),(4,0),(5,0),(6,0)]
				self.center = [4.5,0.5]
			case "O":
				self.activePiece = [(5,0),(6,0),(5,1),(6,1)]
				self.center = [5.5,.5]
			case "T":
				self.activePiece = [(5,1),(6,1),(4,1),(5,0)]
				self.center = [5,1]
			case "J":
				self.activePiece = [(5,1),(6,1),(4,1),(6,0)]
				self.center = [5,1]
			case "L":
				self.activePiece = [(5,1),(6,1),(4,1),(4,0)]
				self.center = [5,1]
			case "Z":
				self.activePiece = [(5,0),(4,0),(5,1),(6,1)]
				self.center = [5,1]
			case "S":
				self.activePiece = [(5,0),(6,0),(5,1),(4,1)]
				self.center = [5,1]
			case _:
				self.activePiece = [(4,0),(5,0),(6,0),(5,1),(5,2)]
				self.center = [0,0]
		for x,y in self.activePiece:
			if self.grid[y][x][0] != 0:
				self.alive = False
				return
			self.grid[y][x] = [2,self.activeType]
		self.render()
	def render(self):
		if self.activePiece:
			ghost = self.activePiece[:]
			while all(y < 19 and self.grid[y+1][x][0]!=1 for x,y in ghost):
				ghost = [(x,y+1) for x,y in ghost]
		for y in range(20):
			for x in range(10):
				if self.grid[y][x][0] in (2,3):
					self.grid[y][x] = [0,'bg']
				if self.activePiece:
					if (x,y) in ghost:
						self.grid[y][x] = [3,'g']
					if (x,y) in self.activePiece:
						self.grid[y][x] = [2,self.activeType]
	def canMoveLeft(self):
		return all(x > 0 and self.grid[y][x-1][0]!=1 for x,y in self.activePiece)
	def canMoveRight(self):
		return all(x < 9 and self.grid[y][x+1][0]!=1 for x,y in self.activePiece)
	def canMoveDown(self):
		return all(y < 19 and self.grid[y+1][x][0]!=1 for x,y in self.activePiece)
			
	def left(self):
		if self.canMoveLeft():
			self.activePiece = [(x-1,y) for x,y in self.activePiece]
			self.center[0]-=1
			self.render()
	def right(self):
		if self.canMoveRight():
			self.activePiece = [(x+1,y) for x,y in self.activePiece]
			self.center[0]+=1
			self.render()
	def drop(self):
		for x,y in self.activePiece:
			self.grid[y][x] = [0,"bg"]
		while self.canMoveDown():
			self.score+=2
			self.activePiece = [(x,y+1) for x,y in self.activePiece]
		for x,y in self.activePiece:
			self.grid[y][x] = [1, self.activeType]
		self.createPiece()
		self.just_stored = False

	def tick(self):
		if not self.activePiece:
			self.createPiece()
		else:
			if self.canMoveDown():
				self.score+=1
				self.groundedTime = 2
				self.activePiece = [(x,y+1) for x,y in self.activePiece]
				self.center[1]+=1
				self.render()
			else:
				if self.groundedTime == 0:
					for x,y in self.activePiece:
						self.grid[y][x] = [1, self.activeType]
					self.createPiece()
					self.just_stored=False
				self.groundedTime -= 1