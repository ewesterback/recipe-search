const { Schema } = require('mongoose')

const Recipe = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    cuisine: { type: Schema.Types.ObjectId, ref: 'cuisines' },
    mainIngredient: { type: Schema.Types.ObjectId, ref: 'ingredients' },
    time: { type: Number, required: true },
    image: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }]
  },
  { timestamps: true }
)

module.exports = Recipe
