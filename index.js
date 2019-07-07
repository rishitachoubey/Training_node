const express= require('express');
const app= express();
app.use(express.json());
const Joi= require('joi');
const courses= [
{id:1, name:'Rishita'},
{id:2, name:'Riya'},
{id:3, name:'Anirudh'},
{id:4, name:'Tanu'}

];


//to get all the courses

app.get('/api/courses/', (req,res)=>

{

res.send(courses);


});

// to get course of specified id

app.get('/api/courses/:id', (req,res)=>

{

const course= courses.find(c=> c.id === parseInt(req.params.id));

if(!course)res.status(404).send('Error!! course not found!');

res.send(course);


});

//Handling Post requests

app.post('/api/courses', (req,res)=>

{

const{error}= validateCourse(req.body);

if(error){

res.status(400).send(result.error);
return;

}

const course= {

id: courses.length+1,
name: req.body.name

};

courses.push(course);
res.send(course);


});

app.put('/api/courses/:id', (req,res)=>

{

    const course= courses.find(c=> c.id === parseInt(req.params.id));

if(!course)res.status(404).send('Error!! course not found!');

const{error}= validateCourse(req.body);
if(error){

    res.status(400).send(error.details[0].message);
    return;
    
    
    }
    

course.name= req.body.name;
res.send(course);
});

function validateCourse(course){


    const schema= {

        name: Joi.string().min(3).required()

    };



return Joi.validate(course, schema);
}

app.delete('/api/courses/:id', (req,res)=>

{

const course= courses.find(c=> c.id === parseInt(req.params.id));

if(!course)res.status(404).send('Error!! course not found!');

const index= courses.indexOf(course);
courses.splice(index, 1);

res.send(course);


});




app.listen(3000,()=> console.log('Listening to port 3000'))
