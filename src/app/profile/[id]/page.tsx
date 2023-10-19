export default function UserProfile({ params }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1 className="text-2xl mb-4 ">User Profile</h1>

            <p className="text-4xl p-2 rounded bg-orange-500 text-white">{params.id}</p>
        </div>
    )
}