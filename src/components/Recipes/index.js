import React, { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import Axios from "axios";

const { Title, Text } = Typography;

const Recipes = () => {
    const [allRecipes, setAllRecipes] = useState([]);

    useEffect(() => {
        Axios.get(process.env.REACT_APP_BACKEND_ENDPOINT + "/v1/allRecipes")
            .then((res) => {
                console.log(res);
                setAllRecipes(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const columns = [{
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: "Title",
        dataIndex: "title",
        key: "title"
    }, {
        title: "Created At",
        dataIndex: "created_ts",
        key: "created_ts",
        render: (ts) => <Text>{new Date(ts).toString()}</Text>
    }, {
        title: "Updated At",
        dataIndex: "updated_ts",
        key: "updated_ts",
        render: (ts) => <Text>{new Date(ts).toString()}</Text>
    }];

    return(
        <>
            <Title>All Recipes</Title>
            {allRecipes && allRecipes.length > 0 ? (<Table dataSource={allRecipes} columns={columns} rowKey="id"/>) : (<p>There are no recipes in the system</p>)}
        </>
    )
};

export default Recipes;