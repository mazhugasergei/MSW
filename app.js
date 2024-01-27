import { handlers } from "./mocks/handlers.js"
import { setupServer } from "msw/node"

const server = setupServer(...handlers)
server.listen()

//
;(async () => {
	const userId = "91iSq96nC3dYRBDxW0fo"
	const userSecret = "cYsAXwUa-eSsaBkJrzTYGEaZF5IfyNZIPPOvSI"

	// getting the token
	const token = await fetch("https://api.avito.ru/token", {
		method: "POST",
		body: new URLSearchParams({
			client_id: userId,
			client_secret: userSecret,
			grant_type: "client_credentials"
		})
	}).then((res) => res.json())

	// getting calls stats
	const callsStats = await fetch(`https://api.avito.ru/core/v1/accounts/${userId}/calls/stats`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token.access_token}`,
			"Content-Type": "application/json"
		},
		body: {
			dateFrom: "2020-04-01",
			dateTo: "2020-04-08",
			itemIds: [1853257996]
		}
	})
		.then((res) => res.json())
		.then((data) => data.result.items)

	// getting posts stats
	const postsStats = await fetch(`https://api.avito.ru/stats/v1/accounts/${userId}/items`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token.access_token}`,
			"Content-Type": "application/json"
		},
		body: {
			dateFrom: "2020-01-01",
			dateTo: "2020-01-01",
			fields: ["views"],
			itemIds: [123456789, 987654321],
			periodGrouping: "day"
		}
	})
		.then((res) => res.json())
		.then((data) => data.result.items)

	console.log({
		calls: callsStats,
		posts: postsStats
	})
})()
