// @flow
import type {BaseAPIResponse} from "./BaseAPIResponse";
import type {Movie} from "../models/Movie";

export type SearchResponse = BaseAPIResponse<Movie>

function parse(json : Object) : SearchResponse {
    return json
}

module.exports = {
    "parseSearch" : parse
};