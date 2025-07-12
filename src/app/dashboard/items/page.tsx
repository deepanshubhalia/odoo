export default function ItemsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Items</h1>
        <a
          href="/dashboard/items/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Add New Item
        </a>
      </div>

      {/* Items grid will go here */}
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">You haven't listed any items yet.</p>
        <a
          href="/dashboard/items/new"
          className="inline-block mt-4 text-primary-600 hover:text-primary-700"
        >
          List your first item →
        </a>
      </div>
    </div>
  )
}
