import React from 'react';

function FoodSearchResult({ searchResults, handleEdit, handleEditInstructions, handleEditMealName }) {
  return (
    searchResults && (
      <div>
        <table className="food-search-results">
          <thead>
            <tr>
              <th>Meal Name</th>
              <th>Ingredients</th>
              <th>Quantity</th>
              <th>Protein(g)</th>
              <th>Carbs(g)</th>
              <th>Fat(g)</th>
              <th>Calories(Kcal) </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan={searchResults.nutritionInfoList.length + 1}>
                <input type="text" value={searchResults.mealName} onChange={handleEditMealName} />
              </td>
            </tr>
            {searchResults.nutritionInfoList.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={item.ingredients}
                    onChange={e => handleEdit(e, index, 'ingredients')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.quantity}
                    onChange={e => handleEdit(e, index, 'quantity')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.protein}
                    onChange={e => handleEdit(e, index, 'protein')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.carbs}
                    onChange={e => handleEdit(e, index, 'carbs')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.fat}
                    onChange={e => handleEdit(e, index, 'fat')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.calories}
                    onChange={e => handleEdit(e, index, 'calories')}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={7}>
                <textarea value={searchResults.instructions} onChange={handleEditInstructions} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  );
}

export default FoodSearchResult;
