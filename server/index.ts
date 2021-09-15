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
app.use(express.static('dist'));

const userCollection = firestore.collection("users");
const roomsCollection = firestore.collection("rooms");


//crea el usuario
app.post("/signup",(req,res)=>{    
    const {nombre} = req.body;
     userCollection.where("nombre", "==", nombre).get().then(searchResponse=>{
        // if(searchResponse.empty){
            userCollection.add({
                nombre,
            }).then(newUserRef=>{
                res.json({
                    id : newUserRef.id,
                })
            })
        // }
        // else{
        //     res.status(400).json({
        //         //esto habria que cambiar porque puede haber muchos nombres parecidos.
        //         message: "User already exist"
        //     })
        // }
        
    })
})


//crear el room
app.post("/createroom", (req,res)=>{
    const {nombre} = req.body;    
    //solo existe si ya hay un registro con ese ID.
    userCollection.doc(nombre.toString()).get().then(doc=>{
        if(!doc.exists){            
            const roomRef = rtdb.ref('/gameRooms/rooms/'+ nanoid());
            roomRef
            .set({
                jugador1:{
                    nombre,
                    score: 0,
                    ready: false,
                    eleccion: 'none',
                    eligio: false,
                    ganador: "none",
                },
                jugador2:{
                    nombre: false,
                    score: 0,
                    ready: false,
                    eleccion: 'none',
                    eligio: false,
                    ganador: "none",
                }
            }).then(rtdbRes =>{
                //el ID de la RTDB
                
                const roomLongId = roomRef.key;
                //crea el numero del id sencillo
                const roomId = 1000 + Math.floor(Math.random()*999);
                //se crea un room para que tenga guardado adentro el ID de la RTDB asi no conocemos el ID Largo 
                roomsCollection.doc(roomId.toString()).set({
                    rtdbRoomId : roomLongId,
                }).then(()=>{})
                    res.json({
                        id:roomId.toString(),
                        rtdbRoomId: roomRef.key,
                    })
            })
        } 
        // else{
        //     res.status(401).json({
        //         message: "no existis",
        //     })
        // }
    })
})

app.get("/checkid/:roomId",(req,res)=>{

    const {roomId} = req.params;
    roomsCollection.doc(roomId.toString()).get().then(doc=>{
        const rtdbRoomId = doc.get("rtdbRoomId");
        const existe = (doc.exists);        
        return res.json({
            rtdbRoomId,
            existe
        });
    })
})

app.get("/verify/:rtdbRoomId", (req,res)=>{
    const {rtdbRoomId} = req.params;
    const referencia = rtdb.ref(`gameRooms/rooms/${rtdbRoomId}`)
    console.log(referencia.key);    
    referencia.once("value", snap=>{
        const contenido = snap.val();
        res.json(contenido)
    })     
})
app.post("/pushUser/:rtdbRoomId",(req,res)=>{
    const {rtdbRoomId} = req.params;
    const {nombre} = req.body;
    const roomRef = rtdb.ref(`/gameRooms/rooms/${rtdbRoomId}/jugador2`);
    roomRef.update({
            nombre,
    }, ()=>{
        res.json(`push jugador con nombre:${nombre}`)
    })
})
//En jugador entra: jugador1 || jugador2
app.post("/setReady", (req, res)=>{
    const {jugador, rtdbRoomId,ready} = req.body;    
    const roomRef = rtdb.ref(`/gameRooms/rooms/${rtdbRoomId}/${jugador}`);    
    roomRef.update({
        ready,
    }).then(()=>{
        res.json(`ready: ${ready}`)
    })
    
})
//En jugador entra: jugador1 || jugador2
app.post("/setPlay/:jugador",(req,res)=>{
    const {jugador} = req.params;
    const {jugada,rtdbRoomId} = req.body;
    const roomRef = rtdb.ref(`/gameRooms/rooms/${rtdbRoomId}/${jugador}`);
    roomRef.update({
        eleccion:jugada,
        eligio: true,
    }).then(()=>{
        res.json(`La eleccion fue ${jugada}`)
    })
}),
//En jugador entra: jugador1 || jugador2

app.post("/setPunto/:jugador",(req,res)=>{
    const {jugador} = req.params;
    const {score,rtdbRoomId} = req.body;
    const roomRef = rtdb.ref(`/gameRooms/rooms/${rtdbRoomId}/${jugador}`);
    roomRef.update({
        score,
    }).then(()=>{
        res.json({
            message: `Punto para ${jugador}`
        })
    });
})
app.post("/setFalse/:jugador",(req,res)=>{
    const {jugador} = req.params;
    const {rtdbRoomId} = req.body;
    const roomRef = rtdb.ref(`/gameRooms/rooms/${rtdbRoomId}/${jugador}`);
    roomRef.update({
        eligio:false,
        ready:false
    }).then(()=>{
        res.json({
            message: "Se paso a false los eligio",
        })
    })
})
app.post("/setGanador/:jugador",(req,res)=>{
    const {jugador} = req.params;
    const {rtdbRoomId} = req.body;
    const roomRef = rtdb.ref(`/gameRooms/rooms/${rtdbRoomId}`);
    roomRef.update({
        ganador:jugador,
    }).then(()=>{
        res.json({
            message:"seteo ganador",
        })
    })
})
//verificar si existe
app.get("/room/:roomId",(req,res)=>{

}),

//verificar los usuarios dentro de la sala para ver si coincide con el introducido
//y resolver en state











app.get("*", (req, res)=>{ 
    res.sendFile(path.join(__dirname,'../dist/index.html'));
}),

app.listen(port,()=>{
    console.log(`escuchando en ${port}` );
});