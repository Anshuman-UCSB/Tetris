from random import shuffle
class Game:
	def __init__(self):
		self.grid = [[[0,"bg"] for _ in range(10)] for _ in range(20)]
		# for i,p in enumerate("IOTJLSZ"):
		# 	self.grid[0][i] = (0,p)
		self.activePiece = []
		self.activeType = None
		self.center = None
		self.alive = True
		self.nextPieces = self.pieceBag()
		self.groundedTime = 2
		self.score = 0
		# id, color
	def pieceBag(self):
		choices = list("IOTJLSZ")
		shuffle(choices)
		return choices
	def clearLines(self):
		clearedLines = 0
		for y in range(19,-1,-1):
			if all(v[0] == 1 for v in self.grid[y]):
				clearedLines += 1
			else:
				if clearedLines:
					for x in range(10):
						self.grid[y+clearedLines][x],self.grid[y][x]=self.grid[y][x],[0,'bg']

	def rotatePoint(self, point, center):
		x,y = point
		cx,cy = center
		return (int(cx-(y-cy)),int((x-cx)+cy))
	def rotate2x3(self, piece):
		print(piece, self.center)
		self.activePiece = [self.rotatePoint(p, self.center) for p in self.activePiece]
	def rotate(self):
		self.rotate2x3(self.activePiece)
		self.render()
	def createPiece(self):
		self.groundedTime = 2
		self.activeType = self.nextPieces.pop(0)
		if len(self.nextPieces) < 7:
			self.nextPieces+=self.pieceBag()
		match(self.activeType):
			case "I":
				self.activePiece = [(5,0),(6,0),(7,0),(4,0)]
				self.center = [5.5,0.5]
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
	def render(self):
		self.clearLines()
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
		print(self.activePiece)
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
			self.activePiece = [(x,y+1) for x,y in self.activePiece]
		for x,y in self.activePiece:
			self.grid[y][x] = [1, self.activeType]
		self.createPiece()
		self.render()

	def tick(self):
		if not self.activePiece:
			self.createPiece()
			self.render()
		else:
			if self.canMoveDown():
				self.groundedTime = 2
				self.activePiece = [(x,y+1) for x,y in self.activePiece]
				self.center[1]+=1
				self.render()
			else:
				if self.groundedTime == 0:
					for x,y in self.activePiece:
						self.grid[y][x] = [1, self.activeType]
					self.createPiece()
					self.render()
				self.groundedTime -= 1