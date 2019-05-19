var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    _id: {
        type: Object,
        default: null
    },
    title: String,
    content: String,
    deadline: {
        type: Date,
        default: null
    },
    priority: Number,
    complete: {
        type: Boolean,
        default: 0
    }
})

module.exports = mongoose.model('todo', todoSchema);