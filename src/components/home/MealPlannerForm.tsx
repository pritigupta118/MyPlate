"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { generateMealPlan } from '@/app/actions'
import { MealPlanContext } from '@/context/MealPlanContext'
import { Loader2 } from 'lucide-react'
 

const formSchema = z.object({
  calorie: z.string(),
  dietPreference: z.enum(["vegetarian", "vegan", "keto", "paleo", "gluten-free", "none"], {
    errorMap: ()=> ({
      message: "Please select a valid diet preference"})
  }),
  mealsPerDay: z.string().min(1, "Please specify the number of meals per day").max(6, "Maximum 6 meals per day"),
  allergies: z.string().optional(),
  note: z.string().optional(),
})


const MealPlannerForm = () => {
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      calorie: "",
      dietPreference: "none",
      mealsPerDay: "3",
      allergies: "",
      note: "",
    },
  })

  const {setOutput, setLoading, loading} = useContext(MealPlanContext)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    setLoading(true)

    const userInputValues = `
    Calorie Target: ${values.calorie},
    Dietary Preference: ${values.dietPreference},
    Meals Per Day: ${values.mealsPerDay},
    Allergies: ${values.allergies || "None"},
    Additional Notes: ${values.note || "None"}
    `
    try {
      const {data} = await generateMealPlan(userInputValues)
      console.log("Generated Meal Plan:", data)
      setOutput(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2">
        <FormField
          control={form.control}
          name="calorie"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Daily Calorie Target</FormLabel>
              <FormControl>
                <Input placeholder="Enter your daily calorie goal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
         <div className="space-y-2">
        <FormField
          control={form.control}
          name="dietPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dietary Preference</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your preference" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="keto">Keto</SelectItem>
                  <SelectItem value="paleo">Paleo</SelectItem>
                  <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
         <div className="space-y-2">
        <FormField
          control={form.control}
          name="mealsPerDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meals Per Day</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your preference" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                </SelectContent>
              </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
          <div className="space-y-2">
        <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergies & Restrictions</FormLabel>
                <FormControl>
                <Input placeholder="List any allergies or dietary restrictions..." {...field} />
                </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
         <div className="space-y-2">
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
                <FormControl>
                <Input placeholder="Any specific preferences or health conditions..." {...field} />
                </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
       
        <Button className='w-full' type="submit" disabled={loading}>{loading && <Loader2 className='w-4 h-4 mr-2 animate-spin'/>} Generate</Button>
      </form>
    </Form>
  )
}

export default MealPlannerForm
