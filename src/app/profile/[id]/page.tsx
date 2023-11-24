
export default function UserProfile({ params }: any) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-3xl font-bold">Profile</h1>
            <hr />
            <p>Profile Page {params.id}</p>
        </div>
    )
}
