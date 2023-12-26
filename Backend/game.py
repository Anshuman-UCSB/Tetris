class Game:
	def __init__(self):
		self.grid = [[(0,"bg") for _ in range(10)] for _ in range(20)]
		self.grid[0][0] = (1,'Z')
		# id, color
		