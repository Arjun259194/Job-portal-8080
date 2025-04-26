import React from "react"
import cities from "indian-cities-json"
import { UseFormRegisterReturn } from "react-hook-form"

interface LocationDropdownProps {
	register: UseFormRegisterReturn<"location">
}

export default function LocationDropdown({ register }: LocationDropdownProps) {
	return (
		<div className="flex flex-col gap-2">
			<label htmlFor="city" className="text-sm font-medium text-gray-700">
				Select your city
			</label>
			<select
				{...register}
				className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
			>
				<option value="">-- Choose a city --</option>
				{cities.cities.map(({ name }, idx) => (
					<option key={idx} value={name}>
						{name}
					</option>
				))}
			</select>
		</div>
	)
}
