import mongoose from 'mongoose';

// Create the schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }, // mongoDb by default gives creatdAt/updatedAt
);

// Create the model based off of schema
const Note = mongoose.model('Note', noteSchema);

export default Note;
