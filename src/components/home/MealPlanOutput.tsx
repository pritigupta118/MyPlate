"use client"

import { MealPlanContext } from "@/context/MealPlanContext"
import { useContext } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"


const MealPlanOutput = () => {
  const { output } = useContext(MealPlanContext)
  return (
    <div className="space-y-6">
      {output?.data.length !== 0 ? (
        <>
          <Tabs defaultValue="monday">
            <TabsList className="grid grid-cols-7 mb-4">
              {output?.data.map((item, index) => (
                <TabsTrigger key={index} value={item.day.toLowerCase()}>
                  {item.day.charAt(0)}
                </TabsTrigger>
              ))}
            </TabsList>
            {output?.data.map((item, index) => (
              <TabsContent key={index} value={item.day.toLowerCase()}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-800">
                      <span className=" w-8 h-8 mr-2 rounded-full bg-green-100 flex items-center justify-center">
                        {item.day.charAt(0)}
                      </span>
                      {item.day}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {
                      item?.meals.map((meal) => (
                        <div className="space-y-2" key={meal?.mealType}>
                          <div className="flex items-center justify-between bg-green-500 px-4 py-2 rounded-lg">
                            <h4 className="font-medium">{meal?.mealType}
                              {meal?.mealType === "breakfast" ? (<span className="p-2 rounded-full  text-green-700">
                                🍳
                              </span>) :
                                meal?.mealType === "lunch" ? (<span className="p-2 rounded-full  text-green-700">
                                  🍽  ️</span>) :

                                  meal?.mealType === "dinner" ? (<span className="p-2 rounded-full  text-green-700">
                                    🍲
                                  </span>) :
                                    (<span className="p-2 rounded-full  text-green-700"> 🍎
                                    </span>)
                              }
                            </h4>
                          </div>

                          <p className="text-gray-800 bg-green-100 p-3 rounded-lg">{meal?.food}</p>
                          {/* <p className="text-sm text-gray-400 w-2 h-2 rounded-full mr-1">Calories: {meal?.calorie}</p> */}
                          <span className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span> {meal?.calorie} cal
                          </span>

                        </div>
                      ))
                    }

                  </CardContent>
                </Card>
              </TabsContent>
            ))}

          </Tabs>
        </>
      ) : (
        <div className="text-center py-16 space-y-4 animate-pulse">
          <div className="mx-auto w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <img src="/output-logo.svg" alt="Meal plan icon" className="w-12 h-12 text-green-500" />
          </div>
          <h3 className="text-xl font-medium text-gray-700">Your meal plan will appear here</h3>
          <p className="text-gray-500">Fill out your preferences and click "Generate Meal Plan" to get started</p>
        </div>
      )}
    </div>
  )
}

export default MealPlanOutput