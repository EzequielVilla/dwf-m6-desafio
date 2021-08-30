import * as express from "express"
import { rtdb, firestore } from "./rtdb";
import * as path from "path"

import { nanoid } from "nanoid";
import * as cors from "cors";

//configuracion del servidor.
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'../dist')));

const userCollection = firestore.collection("users");
const roomsCollection = firestore.collection("rooms");


//crea el usuario
app.post("/signup",(req,res)=>{
    const {nombre} = req.body;
    userCollection.where("nombre", "==", nombre).get().then(searchResponse=>{
        if(searchResponse.empty){
            userCollection.add({
                nombre,
            }).then(newUserRef=>{
                res.json({
                    id : newUserRef.id,
                })
            })
        } else{
            res.status(400).json({
                //esto habria que cambiar porque puede haber muchos nombres parecidos.
                message: "User already exist"
            })
        }
        
    })
})
//verificar si existe el usuario
app.get("/user/:nombre",(req,res)=>{

})

//crear el room
app.post("/rooms", (req,res)=>{

})

//verificar si existe
app.get("/room/:roomId",(req,res)=>{

})

//verificar los usuarios dentro de la sala para ver si coincide con el introducido
//y resolver en state











app.get("*", (req, res)=>{
    
    

    
    res.sendFile(path.join(__dirname,'../dist/index.html'));
})
app.listen(port,()=>{
    console.log(`escuchando en ${port}` );
});