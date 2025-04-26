//Import modules
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [];
let idCounter = 1;

//Routes

//Recuperatin de toutes les taches
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

//Ajout d'une nouvelle tache
app.post('/tasks', (req, res) => {
    const {title} = req.body;
    if (!title) {
        return res.status(400).json({message : 'Le titre est requis'});
    }
    const newTask = {id : idCounter++, title, completed: false};
    tasks.push(newTask);
    res.status(201).json(newTask);
});

//Modifier une tache (ex : marquer comme completee)
app.put('/tasks/:id', (req, res) => {
    const {id} = req.params;
    const {title, completed} = req.body;
    const task = tasks.find(t => t.id == id);

    if (!task) {
        return res.status(404).json({message : 'Tache non trouvee'});
    }

    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    res.json(task);
});

//Supprimer une tache
app.delete('/tasks/:id', (req, res) => {
    const {id} = req.params;
    tasks = tasks.filter(t => t.id != id); //renvoie un tableau avec tous les id != de celui qu'on veut supprimer
    res.status(204).send();
});

//Lancer le serveur
app.listen(PORT, () => {
    console.log('Serveur demarre sur http://localhost:${PORT}');
});