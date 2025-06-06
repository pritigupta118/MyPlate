"use server"
import {createOpenAI} from "@ai-sdk/openai"
import {generateObject} from "ai"
import { z } from "zod"
import endent from "endent"

const groq = createOpenAI({
 baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
})

const systemPrompt = endent`
You are an AI assistant. Generate a 7-day meal plan in JSON format only, based on the user's dietary preferences, calorie target, allergies, meals per day, and notes.

Requirements:
- For each day (Monday to Sunday), create exactly the number of meals specified by the user's "meals per day" input (e.g., 2, 3, 4, etc.).
- Each meal must have a mealType (e.g., breakfast, lunch, dinner, snack), a food description, and a calorie count.
- Ensure all meals strictly avoid any ingredients listed in the user's allergies.
- Carefully consider and incorporate any additional notes provided by the user (e.g., preferences, restrictions, health conditions).
- Make sure the total daily calories are as close as possible to the user's calorie target.
- Vary the meals throughout the week and ensure they match the user's dietary needs and preferences.
- Output only a JSON object with this structure:
{
  "data": [
    {
      "day": "Monday",
      "meals": [
        { "mealType": "breakfast", "food": "Oatmeal with fruits", "calorie": "300" },
        { "mealType": "lunch", "food": "Grilled chicken salad", "calorie": "500" },
        { "mealType": "dinner", "food": "Steamed vegetables and quinoa", "calorie": "400" }
      ]
    }
    // ...repeat for other days
  ]
}

Do not include any explanation, description, or markdown. Only return the JSON object.
`

export async function generateMealPlan(input: string){

  const { object: data } = await generateObject({
    model: groq("llama3-8b-8192"),
    system: systemPrompt,
    prompt: input,
    maxTokens: 2048,
    temperature: 1,
    schema: z.object({
      data: z.array(
        z.object({
          day: z.string().describe("Day of the week (e.g., Monday)"),
          meals: z.array(
            z.object({
              mealType: z.string().describe("Type of meal (e.g., breakfast, lunch, dinner)"),
              food: z.string().describe("Food items for this meal"),
              calorie: z.string().describe("Calorie count of the meal")
            })
          )
        })
      )
    })
  })
  return { data}

}