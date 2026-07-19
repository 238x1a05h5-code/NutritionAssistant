const suggestNutrition = ({
    age,
    weight,
    height,
    gender,
    activityLevel,
    goal
}) => {
    // Calculate BMI
    const heightInMeters = height / 100;

    const bmi = weight / (
        heightInMeters * heightInMeters
    );

    const roundedBMI = Number(bmi.toFixed(2));

    // Determine BMI category
    let bmiCategory;

    if (bmi < 18.5) {
        bmiCategory = "Underweight";
    } else if (bmi < 25) {
        bmiCategory = "Normal weight";
    } else if (bmi < 30) {
        bmiCategory = "Overweight";
    } else {
        bmiCategory = "Obese";
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;

    if (gender.toLowerCase() === "male") {
        bmr = (10 * weight) +
            (6.25 * height) -
            (5 * age) +
            5;
    } else {
        bmr = (10 * weight) +
            (6.25 * height) -
            (5 * age) -
            161;
    }

    // Activity multiplier
    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
    };

    const multiplier =
        activityMultipliers[activityLevel] || 1.2;

    let dailyCalories = bmr * multiplier;

    // Adjust calories according to goal
    if (goal === "weight loss") {
        dailyCalories -= 500;
    } else if (goal === "weight gain") {
        dailyCalories += 500;
    }

    dailyCalories = Math.round(dailyCalories);

    // Macronutrients
    const protein = Math.round(weight * 1.6);

    const proteinCalories = protein * 4;

    const fatCalories = dailyCalories * 0.25;

    const fats = Math.round(fatCalories / 9);

    const carbohydrateCalories =
        dailyCalories -
        proteinCalories -
        fatCalories;

    const carbohydrates = Math.round(
        carbohydrateCalories / 4
    );

    // Recommendations
    const recommendations = [
        "Drink enough water throughout the day.",
        "Include vegetables and fruits in your daily diet.",
        "Choose whole grains and high-fiber foods.",
        "Avoid excessive processed and sugary foods.",
        "Maintain regular physical activity."
    ];

    if (goal === "weight loss") {
        recommendations.push(
            "Focus on a moderate calorie deficit and portion control."
        );
    }

    if (goal === "weight gain") {
        recommendations.push(
            "Include healthy calorie-dense foods in your meals."
        );
    }

    return {
        bmi: roundedBMI,
        bmiCategory,
        dailyCalories,
        protein,
        carbohydrates,
        fats,
        recommendations
    };
};

module.exports = suggestNutrition;