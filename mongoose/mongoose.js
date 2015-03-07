var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/node');

//define the schema
var Schema = mongoose.Schema;
var Tasks = new Schema({
    project: String,
    description: String
});

//registre un model
mongoose.model('Task', Tasks);
var Task = mongoose.model('Task');
var task = new Task();
task.project = 'Car';
task.description = 'Paint the car red';
task.save(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('Task is saved');
    }
});

// afin de trouver des enregistrements
var Task = mongoose.model('Task');
Task.find({'project': 'Car'}, function (err, tasks) {
    if (err) {
        throw err;
    } else {
        tasks.forEach(function (task, i) {
            console.log(task);
        })
    }
})

// afin de modifier un enregistrement
var Task = mongoose.model('Task');
Task.update(
    {_id: '54fb834e0f3163c710f1c52e'},
    {description: 'Paint the bike green'},
    {multi: false}, // just one docuemtn is affected
    function (err, rows) {
        if (err) {
            throw err;
        } else {
            console.log('Updated ' + rows);
        }
    }
)

// afin de supprimer un enregistrement
var Task = mongoose.model('Task');
Task.findById('54fb834e0f3163c710f1c52e', function (err, task) {
    if (err) {
        throw err;
    } else {
        task.remove();
    }
});

// afin de fermer la connection de mongoose
//db.disconnect();