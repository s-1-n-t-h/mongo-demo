const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB....'))
    .catch(err => console.error('Error connecting to MongoDB..',err))

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now},
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)


async function createCourse(){
    const course = new Course({
        name: "React Course",
        author: "Yaswanth",
        tags: ["frontend", "javascript"],
        isPublished: true,
    },);

    const result = await course.save();
    console.log(result);
}

createCourse() 