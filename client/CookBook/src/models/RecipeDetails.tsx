type Ingredient = {
    name: string;
    measure: string;
  }
  
type RecipeDetails = {
id: string;
title: string;
description: string;
ingredients: Ingredient[];
createdAt: string;
}

export type { RecipeDetails };