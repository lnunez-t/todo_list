# Variables
BACKEND_DIR=backend
FRONTEND_DIR=frontend

# Commandes
.PHONY: all backend frontend start

all: start

backend:
	cd $(BACKEND_DIR) && npm install && npx nodemon index.js

frontend:
	cd $(FRONTEND_DIR) && npm install && npm run dev

start:
	# Lancer backend et frontend en parallèle
	make backend & make frontend
