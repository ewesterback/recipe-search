const { Schema } = require('mongoose')

const MainIngredient = new Schema(
  {
    name: { type: String, required: true },
    variations: [{ type: String, required: false }],
    recipes: [{ type: Schema.Types.ObjectId, ref: 'recipes' }]
  },
  { timestamps: true }
)

module.exports = MainIngredient
