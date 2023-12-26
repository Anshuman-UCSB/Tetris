class Game:
	def __init__(self):
		self.grid = [[[0,"bg"] for _ in range(10)] for _ in range(20)]
		for i,p in enumerate("IOTJLSZ"):
			self.grid[0][i] = (0,p)
		self.activePiece = None
		self.activeType = None
		self.alive = True
		# id, color
	def createPiece(self):
		self.activePiece = [(5,0),(6,0),(5,1),(6,1)]
		self.activeType = 'O'
		for x,y in self.activePiece:
			self.grid[y][x] = [2,self.activeType]
	def render(self):
		for y in range(20):
			for x in range(10):
				if self.grid[y][x][0] == 2:
					self.grid[y][x] = [0,'bg']
				if (x,y) in self.activePiece:
					self.grid[y][x] = [2,self.activeType]
	def canMoveLeft(self):
		return all(x > 0 and self.grid[y][x-1]!=1 for x,y in self.activePiece)
	def canMoveRight(self):
		return all(x < 9 and self.grid[y][x+1]!=1 for x,y in self.activePiece)
	def canMoveDown(self):
		return all(y < 19 and self.grid[y+1][x]!=1 for x,y in self.activePiece)
			

	def left(self):
		if self.canMoveLeft():
			self.activePiece = [(x-1,y) for x,y in self.activePiece]
			self.render()
	def right(self):
		if self.canMoveRight():
			self.activePiece = [(x+1,y) for x,y in self.activePiece]
			self.render()
	def tick(self):
		if not self.activePiece:
			self.createPiece()
		else:
			if self.canMoveDown():
				self.activePiece = [(x,y+1) for x,y in self.activePiece]
				self.render()
			else:
				for x,y in self.activePiece:
					self.grid[y][x] = [1, self.activeType]
				self.activePiece = None
				self.activeType = None
				self.render()