const express = require('express');
const { Pool } = require('pg');
const cors = require('cors')

const app = express();
const pool = new Pool({
    user :'postgres',
    host : 'localhost',
    database : 'notes_db',
    password : 'jtd@123',
    port : 5432,
})

app.use(express.json())
app.use(cors())

app.get("/notes", async(req,res) =>{
    const result = await pool.query('SELECT * FROM notes')
    res.json(result.rows)
})

app.post("/notes" , async(req,res) =>{
    const{title,content} = req.body;
    const result = await pool.query('INSERT INTO notes(title,content) VALUES($1,$2) RETURNING *',[title,content])
    res.json(result.rows[0])
})

app.put("/notes/:id" , async(req,res) =>{
    const {id} = req.params;
    const {title ,content} = req.body
    const result = await pool.query('UPDATE notes SET title=$1,content=$2,updated_at = CURRENT_TIMESTAMP WHERE id=$3 RETURNING *',[title,content,id])
    res.json(result.rows[0])
})

app.delete("/notes/:id" , async(req,res) =>{
    const{id} = req.params
    await pool.query('DELETE FROM notes WHERE id = $1',[id])
    res.json({message:"NOTE deleted successfully"})
})

const PORT = 4001;
app.listen(PORT,() =>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
    
