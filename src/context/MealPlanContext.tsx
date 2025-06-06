"use client"

import { createContext, useState } from "react"

interface MealPlanContextType {
  output: { data: { day: string, meals: { mealType: string, food: string, calorie: string }[]}[] };
  loading: boolean;
  setOutput: React.Dispatch<React.SetStateAction<{ data: { day: string, meals: { mealType: string, food: string, calorie: string }[]}[] }>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MealPlanContext = createContext<MealPlanContextType>({
  output: { data: []},
  loading: false,
  setOutput: () => {},
  setLoading: () => {},
})

export const MealPlanProvider = ({children}: {children: React.ReactNode}) => {
  const [output, setOutput] = useState<{data: {day: string, meals: {mealType: string, food: string, calorie: string}[]}[]}>({data: []})
  const [loading, setLoading] = useState(false)

  console.log("Output values:", output)
  return (
    <MealPlanContext.Provider value={{output, loading, setOutput, setLoading}}>
      {children}
    </MealPlanContext.Provider>
  )
}