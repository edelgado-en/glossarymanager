const notificationMethods = [
    { title: 'Active' },
    { title: 'Inactive' },
  ]
  
  export default function RadioGroup({ currentValue, handleOnChange }) {
    return (
      <div>
        <fieldset>
          <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
            {notificationMethods.map((notificationMethod) => (
              <div key={notificationMethod.title} className="flex items-center">
                <input
                  id={notificationMethod.title}
                  name="notification-method"
                  type="radio"
                  onChange={handleOnChange}
                  checked={notificationMethod.title === currentValue}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label htmlFor={notificationMethod.title} className="ml-3 block text-sm font-medium text-gray-700">
                  {notificationMethod.title}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    )
  }