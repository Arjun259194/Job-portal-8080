// components/EducationInput.tsx
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export type Education = {
	institution: string
	degree?: string
	field?: string
}

type Props = {
	education: Education[]
	onAdd: (edu: Education) => void
	onRemove: (index: number) => void
}

export default function EducationInput({ education, onAdd, onRemove }: Props) {
	const [form, setForm] = useState<Education>({
		institution: "",
		degree: "",
		field: "",
	})

	const handleAdd = () => {
		if (form.institution) {
			onAdd(form)
			setForm({ institution: "", degree: "", field: "" })
		}
	}

	return (
		<div className="space-y-2">
			<label className="text-sm font-semibold">Education</label>
			<div className="grid gap-2 sm:grid-cols-3">
				<Input
					placeholder="Institution"
					value={form.institution}
					onChange={(e) => setForm({ ...form, institution: e.target.value })}
				/>
				<Input
					placeholder="Degree (optional)"
					value={form.degree}
					onChange={(e) => setForm({ ...form, degree: e.target.value })}
				/>
				<Input
					placeholder="Field (optional)"
					value={form.field}
					onChange={(e) => setForm({ ...form, field: e.target.value })}
				/>
			</div>
			<Button type="button" onClick={handleAdd}>
				Add Education
			</Button>

			<div className="space-y-1">
				{education.map((edu, idx) => (
					<div
						key={idx}
						className="flex justify-between items-center bg-muted px-4 py-2 rounded"
					>
						<span className="text-sm">
							{edu.institution}
							{edu.degree && ` • ${edu.degree}`}
							{edu.field && ` in ${edu.field}`}
						</span>
						<button
							className="text-red-500 font-bold text-sm"
							onClick={() => onRemove(idx)}
						>
							×
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

