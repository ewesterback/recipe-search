const { Schema } = require('mongoose')

const Recipe = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    cuisine: { type: Schema.Types.ObjectId, ref: 'cuisines', require: true },
    mainIngredient: {
      type: Schema.Types.ObjectId,
      ref: 'ingredients',
      required: true
    },
    time: { type: Number, required: true },
    image: { type: String, required: false },
    ingredients: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }]
  },
  { timestamps: true }
)

module.exports = Recipe
