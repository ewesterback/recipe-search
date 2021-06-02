const { Schema } = require('mongoose')

const Cuisine = new Schema(
  {
    name: { type: String, required: true },
    recipes: [{ type: Schema.Types.ObjectId, ref: 'recipes' }]
  },
  { timestamps: true }
)

module.exports = Cuisine
