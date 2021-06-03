const { Schema } = require('mongoose')

const Recipe = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    cuisine: { type: Schema.Types.ObjectId, ref: 'cuisines', require: false },
    mainIngredient: {
      type: Schema.Types.ObjectId,
      ref: 'ingredients',
      required: false
    },
    time: { type: Number, required: false },
    image: { type: String, required: false },
    ingredients: [{ type: String, required: false }],
    instructions: [{ type: String, required: false }]
  },
  { timestamps: true }
)

module.exports = Recipe
