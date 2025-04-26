import { ProfileForm } from "@/components/ProfileForm"
import action from "./action"

export default function ProfilePage() {
	return (
		<div className="p-10 bg-primary">
			{/* Right side form */}
			<div className="p-8 bg-background w-[90%] mx-auto rounded-4xl">
				<div className="mb-5 ">
					<h1 className="text-3xl font-bold tracking-wide">
						Fill the details<span className="text-indigo-600">_</span>
					</h1>
					<p className="text-muted-foreground">
						100% you bio data and start to find jobs you will love
					</p>
				</div>
				<ProfileForm action={action} />
			</div>
		</div>
	)
}
