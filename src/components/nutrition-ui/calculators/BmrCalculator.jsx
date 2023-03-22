import React, { useState } from 'react';
import './BmrCalculator.css';

const BmrCalculator = () => {
  const [bmr, setBmr] = useState(0);
  const [tdee, setTdee] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');

  const calculateBmr = (weight, height, age, gender) => {
    let result = 0;
    if (gender === 'male') {
      result = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      result = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    setBmr(result);
  };

  const calculateTdee = (bmr, activityLevel) => {
    let result = 0;
    if (activityLevel === 'sedentary') {
      result = bmr * 1.2;
    } else if (activityLevel === 'light') {
      result = bmr * 1.375;
    } else if (activityLevel === 'moderate') {
      result = bmr * 1.55;
    } else if (activityLevel === 'active') {
      result = bmr * 1.725;
    } else if (activityLevel === 'very-active') {
      result = bmr * 1.9;
    }
    setTdee(result);
  };

  return (
    <div className="bmr-calculator">
      <div className="form">
        <div className="form-title">
          <h2>BMR & TDEE Calculator</h2>
        </div>

        <form>
          <div className="input-container">
            <label>Weight (Kg)</label>
            <input
              type="number"
              name="weight"
              placeholder="Please enter your weight"
              onChange={(e) => {
                setWeight(e.target.value);
                calculateBmr(e.target.value, height, age, gender);
              }}
            />
          </div>

          <div className="input-container">
            <label>Height (cm)</label>
            <input
              type="number"
              name="height"
              placeholder="Please enter your height"
              onChange={(e) => {
                setHeight(e.target.value);
                calculateBmr(e.target.value, height, age, gender);
              }}
            />
          </div>

          <div className="input-container">
            <label>Age (years)</label>
            <input
              type="number"
              name="age"
              placeholder="Please enter your age"
              onChange={(e) => {
                setAge(e.target.value);
                calculateBmr(e.target.value, height, age, gender);
              }}
            />
          </div>

          <div className="input-container">
            <label>Gender</label>
            <select
              name="gender"
              onChange={(e) => {
                setGender(e.target.value);
                calculateBmr(e.target.value, height, age, gender);
              }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="input-container">
            <label>Activity Level</label>
            <select
              name="activityLevel"
              onChange={(e) => calculateTdee(bmr, e.target.value)}
            >
              <option value="sedentary">Sedentary</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="active">Active</option>
              <option value="very-active">Very Active</option>
            </select>
          </div>
        </form>
      </div>

      <div className="bmr-tdee-container">
        <div className="bmr">
          <h3>Your BMR is:</h3>
          <p>{bmr} Kcal</p>
        </div>
        <div className="tdee">
          <h3>Your TDEE is:</h3>
          <p>{tdee} Kcal</p>
        </div>
      </div>
    </div>
  );
};

export default BmrCalculator;