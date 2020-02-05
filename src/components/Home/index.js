import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Typography, Descriptions, Button } from "antd";

const { Title, Text } = Typography;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Home = () => {
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [allRecipes, setAllRecipes] = useState([]);

    useEffect(() => {
        Axios.get(process.env.REACT_APP_BACKEND_ENDPOINT + "/v1/allRecipes")
        .then((res) => {
            console.log(res);
            setAllRecipes(res.data);
            if(res.data.length > 0) {
                setCurrentRecipe(res.data[getRandomInt(0, allRecipes.length -1)]);
            }
        })
        .catch((err) => console.error(err));
      }, []);

    const handleNext = () => {
        let newIndex = allRecipes.findIndex(item => item.id === currentRecipe.id);
        const currentIndex = allRecipes.findIndex(item => item.id === currentRecipe.id);
        if(allRecipes.length > 1) {
            while(newIndex === currentIndex) {
                newIndex = getRandomInt(0, allRecipes.length -1);
            }
        }
        setCurrentRecipe(allRecipes[newIndex]);
    }

    return(
        <>
            <Title level={3}>The recipe for the day is</Title>
            {currentRecipe !== null ? (
                <Descriptions title="Recipe" bordered>
                    <Descriptions.Item label="Id">{currentRecipe.id}</Descriptions.Item>
                    <Descriptions.Item label="Title">{currentRecipe.title}</Descriptions.Item>
                    <Descriptions.Item label="Cuisine">{currentRecipe.cuisine}</Descriptions.Item>
                    <Descriptions.Item label="Created At">{new Date(currentRecipe.created_ts).toString()}</Descriptions.Item>
                    <Descriptions.Item label="Updated At">{new Date(currentRecipe.updated_ts).toString()}</Descriptions.Item>
                    <Descriptions.Item label="Total Time (mins)">{currentRecipe.total_time_in_min}</Descriptions.Item>
                    <Descriptions.Item span={3} label="Ingrdients">{currentRecipe.ingredients.map((item, index) => (
                        <React.Fragment key={`ingredient-${index}`}>
                            {item}
                            <br />
                        </React.Fragment>
                        )
                    )}
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Steps"><ul>{currentRecipe.steps.sort((a, b) => a.position < b.position).map((item, index) => (
                            <li key={`steps-${item.position}`}>{item.items}</li>
                        )
                    )}</ul>
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Nutrition Information">
                        <Text strong>Calories: </Text>{currentRecipe.nutrition_information.calories}
                        <br />
                        <Text strong>Cholesterol (mg): </Text>{currentRecipe.nutrition_information.cholesterol_in_mg}
                        <br />
                        <Text strong>Sodium (mg): </Text>{currentRecipe.nutrition_information.sodium_in_mg}
                        <br />
                        <Text strong>Carbohydrates (grams): </Text>{currentRecipe.nutrition_information.carbohydrates_in_grams}
                        <br />
                        <Text strong>Proteins (grams): </Text>{currentRecipe.nutrition_information.protein_in_grams}
                    </Descriptions.Item>
                </Descriptions>) : (
                <p>There are no recipes in the system</p>)
            }
            <Button type="primary" style={{ marginTop: 10, float: "right", width: 100 }} onClick={handleNext} disabled={allRecipes.length <= 1}>Next</Button>
        </>
    );
}

export default Home;