import React, { useContext, useEffect } from "react";
import { View } from 'react-native';
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { useState } from "react/cjs/react.development";
import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled(View)`
    padding: ${props => props.theme.space[3]};
    position: absolute;
    top: 40px;
    width: 100%;
    z-index: 999;
`


export const Search = () => {
    const { keyword, search } = useContext(LocationContext);
    const [searchKeyword, setSearchKeyword] = useState(keyword);

    useEffect(() => {
        setSearchKeyword(keyword);
    }, [keyword]);

    return (
        <SearchContainer>
            <Searchbar
                icon="map"
                placeholder="Search for a location"
                value={searchKeyword}
                onSubmitEditing={() => {
                    search(searchKeyword);
                }}
                onChangeText={(text) => {
                    setSearchKeyword(text);
                }}
            />
        </SearchContainer>
    )
};