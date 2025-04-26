// components/ExperienceInput.tsx
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export type Experience = {
	role: string
	company: string
	years: number
	current: boolean
}

type Props = {
	experiences: Experience[]
	onAdd: (exp: Experience) => void
	onRemove: (index: number) => void
}

export default function ExperienceInput({ experiences, onAdd, onRemove }: Props) {
	const [form, setForm] = useState<Experience>({
		role: "",
		company: "",
		years: 0,
		current: false,
	})

	const handleAdd = () => {
		if (form.role && form.company && form.years > 0) {
			onAdd(form)
			setForm({ role: "", company: "", years: 0, current: false })
		}
	}

	return (
		<div className="space-y-2">
			<label className="text-sm font-semibold">Experience</label>
			<div className="grid gap-2 sm:grid-cols-2">
				<Input
					placeholder="Role"
					value={form.role}
					onChange={(e) => setForm({ ...form, role: e.target.value })}
				/>
				<Input
					placeholder="Company"
					value={form.company}
					onChange={(e) => setForm({ ...form, company: e.target.value })}
				/>
				<Input
					type="number"
					min={0}
					placeholder="Years"
					value={form.years}
					onChange={(e) => setForm({ ...form, years: parseInt(e.target.value) })}
				/>
				<div className="flex items-center gap-2">
					<Checkbox
						checked={form.current}
						onCheckedChange={(checked) =>
							setForm({ ...form, current: checked === true })
						}
					/>
					<span className="text-sm">Currently working here</span>
				</div>
			</div>
			<Button type="button" onClick={handleAdd}>
				Add Experience
			</Button>

			<div className="space-y-1">
				{experiences.map((exp, idx) => (
					<div
						key={idx}
						className="flex justify-between items-center bg-muted px-4 py-2 rounded"
					>
						<span className="text-sm">
							{exp.role} at {exp.company} ({exp.years} yr{exp.years > 1 && "s"})
							{exp.current && " [Current]"}
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

