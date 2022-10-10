const { Schema, Model, Types } = require("mongoose");
const dateFormat = require =("../utils/dateFormat");

const thoughtSchema = newSchema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280
        },
       createAt: {
           type: Date,
           default: Date.now,
           get: (createdAtVal) => dateFormat(createdAtVal),
       },
       username: {
           type: String,
           required: true,
       },
       reactions: [reactionSchema],
    },
    {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
   }
);


const reactionSchema = newSchema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (creatAtVal) => dateFormat(creatAtVal),
        },
    },
    {
    toJSON: {
        getters: true,
    },
   }
);

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = Model("thought", thoughtSchema);
module.exports = Thought;