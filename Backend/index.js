const express=require('express')
const app=express();
const fs=require('fs')
const cors=require('cors')


app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send("This is My Server");
})
app.get('/students',(req,res)=>{
    fs.readFile('./data.json','utf8',(err,data)=>{
        if(err){
            console.log("File Not Found.......");
        }
        const students=JSON.parse(data)
        res.json(students)
    })

})
app.get('/students/:id',(req,res)=>{
    const id=parseInt(req.params.id)

    fs.readFile('./data.json','utf8',(err,data)=>{
        if(err){
            console.log("File Not Found.......");
        }
        const students=JSON.parse(data)
        
        const studentData=students.find(item=>item.id===id)
        res.json(studentData)

    })

    
})
app.put('/students/:id',(req,res)=>{
    const id=parseInt(req.params.id)

    fs.readFile('./data.json','utf8',(err,data)=>{
        if(err){
            console.log("File Not Found.......");
        }
        const students=JSON.parse(data)
        
        const studentData=students.find(item=>item.id===id)
        studentData.name=req.body.name
        studentData.course=req.body.course
        res.json(studentData)
        fs.writeFile('./data.json',JSON.stringify(students),(err)=>{
            if(err){

            }

        })

    })
  
})
app.delete('/students/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    fs.readFile('./data.json','utf8',(err,data)=>{
        if(err){
            console.log("File Not Found.......");
        }
        const students=JSON.parse(data)
        
        const studentData=students.filter(item=>item.id!=id)
        fs.writeFile('./data.json',JSON.stringify(studentData),(err)=>{
           

        })

    
})
})
app.post('/students',(req,res)=>{
    const newStudent={
        id:req.body.id,
        name:req.body.name,
        course:req.body.course
    }
    fs.readFile('./data.json','utf8',(err,data)=>{
        if(err){
            console.log("File Not Found.......");
        }
        const students=JSON.parse(data)
        students.push(newStudent)
        fs.writeFile('./data.json',JSON.stringify(students),(err)=>{
            if(err){

            }
            res.json(newStudent);
        })
    })


})

app.listen(8080,()=>{
    console.log("server is running.......");
});