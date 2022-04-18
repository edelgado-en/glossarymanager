import { useEffect, useState } from 'react';
import GlossaryNewEntry from './GlossaryNewEntry';
import RadioGroup from './RadioGroup';

import * as api from './apiService';
  
export default function Example() {
    const [showNewEntry, setShowNewEntry] = useState();
    const [glossaries, setGlossaries] = useState([]);
    const [editSource, setEditSource] = useState();
    const [editTranslation, setEditTranslation] = useState();
    const [editStatus, setEditStatus] = useState();

    useEffect(() => {
      searchGlossaries();
    }, []);

    const searchGlossaries = async () => {
      try {
        const { data } = await api.getGlossaries();
        setGlossaries(data);

      } catch (err) {
          console.log(err);
      }
    }

    const handleAddNewEntry = async (newEntry) => {
      try {
        const { data } = await api.saveGlossary(newEntry);
        
        setGlossaries([...glossaries, data]);

      } catch (err) {
        console.log(err);
      }
    }

    const handleCancelEditMode = (glossary) => {
        let newGlossaryList = [...glossaries];

        for (let i = 0; i  < newGlossaryList.length; i++) {
            newGlossaryList[i].editMode = false;
        } 

        setGlossaries(newGlossaryList);
    }

    const handleOpenEditMode = (glossary) => {
        let newGlossaryList = [...glossaries];

        for (let i = 0; i  < newGlossaryList.length; i++) {
            if (newGlossaryList[i].id === glossary.id) {
                newGlossaryList[i].editMode = true;  
            } else {
                newGlossaryList[i].editMode = false;
            }
        } 

        setGlossaries(newGlossaryList);
        setEditSource(glossary.term);
        setEditTranslation(glossary.translation);
        setEditStatus(glossary.status);
    }

    const handleDelete = async (glossary) => {
        try {
          api.deleteGlossary(glossary);

          const newGlossaryList = glossaries.filter(function(g) {
            return g !== glossary;
        });

        setGlossaries(newGlossaryList);

        } catch (err) {
          console.log(err);
        }
    }

    const handleSaveGlossary = async (glossary) => {
      try {
        await api.saveGlossary(glossary);

        let newGlossaryList = [...glossaries];

        for (let i = 0; i < newGlossaryList.length; i++) {
            if (newGlossaryList[i].id === glossary.id) {
                newGlossaryList[i].term = editSource;
                newGlossaryList[i].translation = editTranslation;
                newGlossaryList[i].status = editStatus;

                newGlossaryList[i].editMode = false;
                break;
            }
        }

        setGlossaries(newGlossaryList);

      } catch (err) {
        console.log(err);
      }
    }

    const handleStatusChange = (event) => {
        setEditStatus(event.target.id);
    }

    const handleCloseNewEntry = () => {
      setShowNewEntry(false);
    }

    const handleOpenNewEntry = () => {
        setShowNewEntry(true)
    }

    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Glossary Management</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the glossary with their corresponding translations.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={handleOpenNewEntry}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Glossary
            </button>
          </div>
        </div>

        { showNewEntry ?
            <div style={{ margin: 'auto', width: '70%' }}>
                <GlossaryNewEntry 
                    handleCancel={handleCloseNewEntry}
                    handleAddNewEntry={handleAddNewEntry}
                    />
            </div>
            :
            null
        }

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                      >
                        Source
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                      >
                        Translation
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                      >
                        Status
                      </th>
                      <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {glossaries.map((glossary) => (
                      <tr key={glossary.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                          { glossary.editMode ?
                            <input
                            type="text"
                            value={editSource}
                            onChange={(e) => setEditSource(e.target.value)}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-solid border-gray-300 p-3 rounded-md" style={{ padding: '10px', width: '80%' }}
                            />
                            :
                            <span>{glossary.term}</span>

                            }
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            { glossary.editMode ?
                                <input
                                type="text"
                                value={editTranslation}
                                onChange={(e) => setEditTranslation(e.target.value)}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-solid border-gray-300 p-3 rounded-md" style={{ padding: '10px', width: '80%' }}
                                />
                                :
                                <span>{glossary.translation}</span>
                            }
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            
                            {glossary.editMode ?
                                <RadioGroup 
                                    currentValue={editStatus}
                                    handleOnChange={handleStatusChange}
                                    />
                                :
                                <span className={glossary.status === 'Active'
                                             ? "inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                                              : "inline-flex rounded-full bg-red-50 px-2 text-xs font-semibold leading-5 text-red-400"}>
                                    {glossary.status}
                                </span>
                            }


                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          { glossary.editMode ?
                            <>
                            <button
                                type="button"
                                style={{ marginRight: '10px' }}
                                onClick={() => handleCancelEditMode(glossary)}
                                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSaveGlossary(glossary)}
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save
                            </button>
                            </>
                            :
                            <>
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                                style={{ marginRight: '10px' }}
                                onClick={() => handleDelete(glossary)}
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                onClick={() => handleOpenEditMode(glossary)}
                                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                Edit
                            </button>
                            </>
                        }

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }