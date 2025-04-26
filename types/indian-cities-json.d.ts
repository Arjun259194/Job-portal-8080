// src/types/indian-cities-json.d.ts
declare module "indian-cities-json" {
	export interface IndianCity {
    id: string, 
    name: string, 
    state: string
	}

	const cities: {
		cities: IndianCity[]
	}
	export default cities

	//   Object { cities: (1221) […] }
	// cities: Array(1221) [ {…}, {…}, {…}, … ]
	// [0…99]
	// 0: Object { id: "1", name: "Mumbai", state: "Maharashtra" }
	// id: "1"
	// name: "Mumbai"
	// state: "Maharashtra"
}
