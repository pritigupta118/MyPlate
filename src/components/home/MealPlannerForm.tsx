"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'


import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 

const formSchema = z.object({
  calorie: z.string().min(1000, "Calorie intake is required"),
  dietPreference: z.enum(["vegetarian", "vegan", "keto", "paleo", "gluten-free", "none"], {
    errorMap: ()=> ({
      message: "Please select a valid diet preference"})
  }),
  mealsPeDay: z.number().min(1, "Please specify the number of meals per day").max(6, "Maximum 6 meals per day"),
  allergies: z.string().optional(),
  note: z.string().optional(),
})


const MealPlannerForm = () => {
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      calorie: "",
      dietPreference: "none",
      mealsPeDay: 3,
      allergies: "",
      note: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
                <Input placeholder="Enter your daily calorie goal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default MealPlannerForm
