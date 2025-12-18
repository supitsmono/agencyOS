import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createOrganization } from "./actions"

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white border border-zinc-200 shadow-sm rounded-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">Welcome to AgencyOS</h1>
                    <p className="text-zinc-500 text-sm">To get started, please create your agency profile.</p>
                </div>

                <form action={createOrganization} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                            Agency Name
                        </label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="e.g. Elite Models"
                            required
                            className="h-11 bg-zinc-50"
                        />
                    </div>

                    <Button type="submit" className="w-full h-11 bg-zinc-900 hover:bg-black text-white font-medium">
                        Create Agency
                    </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
                    <p className="text-xs text-zinc-400">
                        Joining an existing team? Check your email for an invitation link.
                    </p>
                </div>
            </div>
        </div>
    )
}
