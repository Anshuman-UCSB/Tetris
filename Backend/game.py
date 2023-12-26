class Game:
	def __init__(self):
		self.grid = [[(0,"bg") for _ in range(10)] for _ in range(20)]
		for i,p in enumerate("IOTJLSZ"):
			self.grid[0][i] = (0,p)
		self.activePiece = False
		self.alive = True
		# id, color
	def createPiece(self):
		self.activePiece = True
		self.grid[0][5] = (1,"O")
		self.grid[0][6] = (1,"O")
		self.grid[1][5] = (1,"O")
		self.grid[1][6] = (1,"O")
	def tick(self):
		if not self.activePiece:
			self.createPiece()
		else:
			for y in range(19,0,-1):
				for x in range(10):
					if self.grid[y-1][x][0] == 1:
						# above is an active piece
						if self.grid[y][x][1]!='bg':
							self.alive = False
							return
						self.grid[y][x],self.grid[y-1][x]=self.grid[y-1][x],self.grid[y][x]