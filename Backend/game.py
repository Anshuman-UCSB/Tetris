class Game:
	def __init__(self):
		self.grid = [[(0,"bg") for _ in range(10)] for _ in range(20)]
		for i,p in enumerate("IOTJLSZ"):
			self.grid[0][i] = (1,p)
		self.activePiece = False
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