import React, { useState } from 'react';
import axios from 'axios';
import FoodSearchResult from './FoodSearchResult';
import './css/FoodSearchForm.css';

function FoodSearchForm() {
  const [mealName, setMealName] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMealNameChange = event => {
    setMealName(event.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8080/sendprompt/${mealName}`);
      setSearchResults(response.data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const handleEdit = (event, index, field) => {
    const value = event.target.value;
    setSearchResults(prevState => {
      const newNutritionInfoList = [...prevState.nutritionInfoList];
      newNutritionInfoList[index][field] = value;
      return { ...prevState, nutritionInfoList: newNutritionInfoList };
    });
  };

  const handleEditMealName = event => {
    setSearchResults(prevState => ({ ...prevState, mealName: event.target.value }));
  };

  const handleEditInstructions = event => {
    setSearchResults(prevState => ({ ...prevState, instructions: event.target.value }));
  };

  return (
    <div>
      <div class="search-form">
        <input id="meal-name" type="text" placeholder="Enter a meal name" value={mealName} onChange={handleMealNameChange} class="search-box" />
        <button onClick={handleSearch} disabled={isLoading} class="search-button">
          {isLoading ? 'Wait..Your Meal is getting ready...' : 'Generate by AI'}
        </button>
      </div>
      {error && <div>Error: {error}</div>}
      {searchResults && (
        <FoodSearchResult
          searchResults={searchResults}
          handleEdit={handleEdit}
          handleEditInstructions={handleEditInstructions}
          handleEditMealName={handleEditMealName}
        />
      )}
    </div>
  );
}

export default FoodSearchForm;
