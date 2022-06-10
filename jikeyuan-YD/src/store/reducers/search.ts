import {SearchResult, Suggestion} from "../../types/data";
import {SearchAction} from "../../types/store";

type SearchState={
    suggestion:Suggestion['options'],
    searchResults:SearchResult
}

const initialState:SearchState={
    suggestion:[],
    searchResults:{
        page:1,
        per_page:10,
        total_count:0,
        results:[]
    }
}

const Search=(state=initialState,action:SearchAction):SearchState=>{
    switch (action.type){
        case 'search/suggestion':
            return {
                ...state,
                suggestion:action.payload
            }
        case 'search/clearSuggestion':
            return {
                ...state,
                suggestion:[]
            }
        case 'search/getSearchResult':
            return {
                ...state,
                searchResults:action.payload
         }
        default :
            return state;
    }
}

export default Search
