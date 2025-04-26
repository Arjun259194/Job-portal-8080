// ProfileForm.tsx
"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import LocationDropdown from "./LocationDropdown"
import SkillInput from "./SkillInput"
import { useState } from "react"
import EducationInput, { Education } from "./EduInput"
import ExperienceInput, { Experience } from "./ExpInput"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export type Input = {
	location: string
	summary: string
	website?: string
	skills: string[]
	experienc: Experience[]
	education: Education[]
}

type ProfileFormProps = {
	action: (input: Input) => Promise<void>
}

export function ProfileForm({ action }: ProfileFormProps) {
	const { register, handleSubmit, setValue } = useForm<Input>()
	const [skills, setSkills] = useState<string[]>([])
	const [experiences, setExperiences] = useState<Experience[]>([])
	const [educations, setEducations] = useState<Education[]>([])
	const router = useRouter()

	const addSkill = (skill: string) => {
		const updated = [...skills, skill]
		setSkills(updated)
		setValue("skills", updated)
	}

	const removeSkill = (skill: string) => {
		const updated = skills.filter(s => s !== skill)
		setSkills(updated)
		setValue("skills", updated)
	}

	const onSubmit = (data: Input) => {
		const response = action(data)
		toast.promise(response, {
			loading: "loading...",
			success: () => {
				router.push("/")
				return "OK"
			},
		})
	}

	return (
		<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
			{/* Location */}
			<LocationDropdown register={register("location")} />

			{/* Website */}
			<div className="space-y-2">
				<label htmlFor="website" className="text-sm font-semibold">
					Website
				</label>
				<Input {...register("website")} />
			</div>

			<ExperienceInput
				experiences={experiences}
				onAdd={exp => {
					const updated = [...experiences, exp]
					setExperiences(updated)
					setValue("experienc", updated)
				}}
				onRemove={idx => {
					const updated = experiences.filter((_, i) => i !== idx)
					setExperiences(updated)
					setValue("experienc", updated)
				}}
			/>

			<EducationInput
				education={educations}
				onAdd={edu => {
					const updated = [...educations, edu]
					setEducations(updated)
					setValue("education", updated)
				}}
				onRemove={idx => {
					const updated = educations.filter((_, i) => i !== idx)
					setEducations(updated)
					setValue("education", updated)
				}}
			/>

			{/* Skills */}
			<div className="space-y-2">
				<label htmlFor="skills" className="text-sm font-semibold">
					Skills
				</label>
				<SkillInput skills={skills} onAdd={addSkill} onRemove={removeSkill} />
			</div>

			{/* Summary */}
			<div className="space-y-2">
				<label htmlFor="summary" className="text-sm font-semibold">
					About Me
				</label>
				<Textarea
					{...register("summary")}
					placeholder="Write a short summary about yourself..."
				/>
			</div>

			{/* Submit */}
			<Button type="submit" className="w-full">
				Continue
			</Button>
		</form>
	)
}
