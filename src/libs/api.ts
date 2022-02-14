import { GraphQLClient } from "graphql-request";

const API_URL = "https://rifkidhan.herokuapp.com/graphql";

export async function fetchAPI(query: any, { variables } = {}) {
	const res = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	const json = await res.json();

	if (json.errors) {
		console.error(json.errors);
		throw new Error("Failed to fetch api");
	}

	return json.data;
}

const graphqlFetcher = new GraphQLClient(API_URL);
export const fetcher = (query: any, variables: any) =>
	graphqlFetcher.request(query, variables);
