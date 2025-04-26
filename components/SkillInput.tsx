// components/SkillInput.tsx
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type SkillInputProps = {
	skills: string[]
	onAdd: (skill: string) => void
	onRemove: (skill: string) => void
}

export default function SkillInput({ skills, onAdd, onRemove }: SkillInputProps) {
	const [input, setInput] = useState("")

	const handleAdd = () => {
		const trimmed = input.trim()
		if (trimmed && !skills.includes(trimmed)) {
			onAdd(trimmed)
			setInput("")
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault()
			handleAdd()
		}
	}

	return (
		<div className="space-y-2">
			<div className="flex gap-2">
				<Input
					placeholder="Add a skill"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<Button type="button" onClick={handleAdd}>
					Add
				</Button>
			</div>
			<div className="flex flex-wrap gap-2">
				{skills.map((skill) => (
					<div
						key={skill}
						className="bg-muted px-3 py-1 rounded-full flex items-center gap-1 text-sm"
					>
						{skill}
						<button
							type="button"
							onClick={() => onRemove(skill)}
							className="text-red-500 font-bold"
						>
							×
						</button>
					</div>
				))}
			</div>
		</div>
	)
}
