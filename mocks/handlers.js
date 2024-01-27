import { http, HttpResponse } from "msw"

export const handlers = [
	http.post("https://api.avito.ru/token", () => {
		return HttpResponse.json({
			access_token: "kChqt9ewQNAcwgbHp4yFd5",
			expires_in: 3600,
			token_type: "Bearer"
		})
	}),

	http.post(`https://api.avito.ru/core/v1/accounts/:userId/calls/stats`, () => {
		return HttpResponse.json({
			result: {
				items: [
					{
						days: [
							{
								answered: 0,
								calls: 0,
								date: "2020-04-01",
								new: 0,
								newAnswered: 0
							}
						],
						employeeId: 0,
						itemId: 1853257996
					}
				]
			}
		})
	}),

	http.post("https://api.avito.ru/stats/v1/accounts/:userId/items", () => {
		return HttpResponse.json({
			result: {
				items: [
					{
						itemId: "<item_id_1>",
						stats: [
							{
								date: "2020-06-11",
								uniqContacts: 1,
								uniqFavorites: 0,
								uniqViews: 10
							},
							{
								date: "2020-06-12",
								uniqContacts: 0,
								uniqFavorites: 2,
								uniqViews: 7
							}
						]
					},
					{
						itemId: "<item_id_2>",
						stats: [
							{
								date: "2020-06-11",
								uniqContacts: 4,
								uniqFavorites: 3,
								uniqViews: 21
							},
							{
								date: "2020-06-12",
								uniqContacts: 1,
								uniqFavorites: 1,
								uniqViews: 18
							}
						]
					}
				]
			}
		})
	})
]
