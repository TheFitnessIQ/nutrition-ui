import React, { useState } from 'react';
import './FoodSearchComponent.css';

function FoodSearchComponent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nutritionInfoList, setNutritionInfoList] = useState([]);
    const [instructions, setInstructions] = useState([]);

    const infoList = nutritionInfoList || [];


    const handleChange = event => {
        setSearchTerm(event.target.value);
    };


    const handleEdit = (e, index, field) => {
        const newList = [...nutritionInfoList];
        newList[index][field] = e.target.value;
        setNutritionInfoList(newList);
    };

    const handleEditInstructions = e => {
        setInstructions(e.target.value);
    };

    const handleEditMealName = (e) => {
        setSearchResults({
            ...searchResults,
            mealName: e.target.value
        });
    };



    const handleSave = () => {
        // Add code to save the updated nutrition info list to the server
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/sendprompt/${searchTerm}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer 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'
                }
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            setSearchResults(data);
            setNutritionInfoList(data.nutritionInfoList);
            setInstructions(data.instructions);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }

    };



    return (
        <div className="food-search-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search for food items"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {searchResults && (
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
                                <th>Calories</th>
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
                        </tbody>
                    </table>
                    <div className="instructions">
                        <strong>Instructions:</strong>
                        <textarea value={instructions} onChange={e => handleEditInstructions(e)} />
                    </div>
                    <button onClick={handleSave}>Save</button>
                </div>
            )}
        </div>

    );

}

export default FoodSearchComponent;
