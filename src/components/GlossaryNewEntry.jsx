import { useState } from 'react';

export default function GlossaryNewEntry({ handleCancel, handleAddNewEntry }) {
    const [source, setSource] = useState();
    const [translation, setTranslation] = useState();

    const handleAdd = (e) => {
        e.preventDefault();

        const newEntry = {
            term: source,
            translation: translation,
            status: 'Active'
        }

        setSource('');
        setTranslation('');

        handleAddNewEntry(newEntry);
    }

    return (
      <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
          <div className="pt-8">
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  Source
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-solid border-gray-300 p-3 rounded-md" style={{ padding: '10px', width: '80%' }}
                  />
                </div>
              </div>
  
              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Translation
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={translation}
                    onChange={(e) => setTranslation(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-solid border-gray-300 p-3 rounded-md" style={{ padding: '10px', width: '80%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleAdd}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    )
  }