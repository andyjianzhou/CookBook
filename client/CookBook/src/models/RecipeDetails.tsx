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
updatedAt: string | null;
}

export type { RecipeDetails };